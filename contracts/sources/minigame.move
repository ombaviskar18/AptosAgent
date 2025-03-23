module AptosMinihub::minigame {
    use std::signer;
    use std::string::{String, utf8};
    use aptos_framework::event;
    use AptosMinihub::minigame_factory;

    const E_NOT_PARTICIPANT: u64 = 100;
    const E_INVALID_TURN: u64 = 101;
    const E_GAME_COMPLETED: u64 = 102;

    struct GameState has key {
        id: u64,
        prompt: String,
        creator: address,
        ai_agent: address,
        status: u8,
        moves: vector<Move>,
        current_player: address,
        game_config: String,
        result: u8,
    }

    struct Move has store {
        player: address,
        move_data: String,
        timestamp: u64,
    }

    struct GameEventStore has key {
        move_events: event::EventHandle<MoveEvent>,
        result_events: event::EventHandle<GameResultEvent>,
    }

    struct MoveEvent has drop, store {
        game_id: u64,
        player: address,
        move_data: String,
        timestamp: u64,
    }

    struct GameResultEvent has drop, store {
        game_id: u64,
        winner: address,
        result: String,
        timestamp: u64,
    }

    public(friend) fun initialize_game(
        game_id: u64,
        prompt: String,
        creator: address,
        ai_agent: address
    ) {
        let game = GameState {
            id: game_id,
            prompt,
            creator,
            ai_agent,
            status: 0, // PENDING
            moves: vector::empty(),
            current_player: creator,
            game_config: utf8(b""),
            result: 0,
        };

        move_to(&creator, game);
        move_to(&creator, GameEventStore {
            move_events: event::new_event_handle<MoveEvent>(&creator),
            result_events: event::new_event_handle<GameResultEvent>(&creator),
        });
    }

    public entry fun submit_ai_config(
        ai_agent: &signer,
        game_id: u64,
        config: String
    ) acquires GameState, GameEventStore {
        let agent_addr = signer::address_of(ai_agent);
        let game = borrow_global_mut<GameState>(minigame_factory::get_game_address(game_id));
        
        assert!(agent_addr == game.ai_agent, E_NOT_PARTICIPANT);
        assert!(game.status == 0, E_GAME_COMPLETED);

        game.game_config = config;
        game.status = 1; // ACTIVE
    }

    public entry fun player_move(
        player: &signer,
        game_id: u64,
        move_data: String
    ) acquires GameState, GameEventStore {
        let player_addr = signer::address_of(player);
        let game = borrow_global_mut<GameState>(minigame_factory::get_game_address(game_id));
        let events = borrow_global_mut<GameEventStore>(minigame_factory::get_game_address(game_id));

        assert!(game.status == 1, E_GAME_COMPLETED);
        assert!(player_addr == game.current_player, E_INVALID_TURN);

        let timestamp = aptos_framework::timestamp::now_seconds();
        vector::push_back(&mut game.moves, Move {
            player: player_addr,
            move_data: copy move_data,
            timestamp,
        });

        // Switch turns
        game.current_player = if (player_addr == game.creator)
            game.ai_agent
        else
            game.creator;

        event::emit_event(&mut events.move_events, MoveEvent {
            game_id,
            player: player_addr,
            move_data,
            timestamp,
        });
    }

    public entry fun finalize_game(
        ai_agent: &signer,
        game_id: u64,
        result: String
    ) acquires GameState, GameEventStore {
        let agent_addr = signer::address_of(ai_agent);
        let game = borrow_global_mut<GameState>(minigame_factory::get_game_address(game_id));
        let events = borrow_global_mut<GameEventStore>(minigame_factory::get_game_address(game_id));

        assert!(agent_addr == game.ai_agent, E_NOT_PARTICIPANT);
        assert!(game.status == 1, E_GAME_COMPLETED);

        game.status = 2; // COMPLETED
        let timestamp = aptos_framework::timestamp::now_seconds();

        event::emit_event(&mut events.result_events, GameResultEvent {
            game_id,
            winner: agent_addr,
            result,
            timestamp,
        });
    }
}