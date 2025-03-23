module AptosMinihub::minigame_factory {
    use std::signer;
    use std::string::String;
    use aptos_framework::coin;
    use aptos_framework::event;
    use AptosMinihub::minigame;

    const E_NOT_ADMIN: u64 = 1;
    const E_INVALID_FEE: u64 = 2;

    struct MinigameFactory has key {
        game_count: u64,
        fee: u64,
        admin: address,
        games: table::Table<u64, address>,
        game_created_events: event::EventHandle<GameCreatedEvent>,
    }

    struct GameCreatedEvent has drop, store {
        game_id: u64,
        creator: address,
        prompt: String,
        ai_agent: address,
        created_at: u64,
    }

    public entry fun initialize_factory(admin: &signer, fee: u64) {
        let admin_addr = signer::address_of(admin);
        move_to(admin, MinigameFactory {
            game_count: 0,
            fee,
            admin: admin_addr,
            games: table::new(),
            game_created_events: event::new_event_handle<GameCreatedEvent>(admin),
        });
    }

    public entry fun create_minigame(
        creator: &signer,
        prompt: String
    ) acquires MinigameFactory {
        let factory = borrow_global_mut<MinigameFactory>(@AptosMinihub);
        let fee = factory.fee;
        
        // Pay creation fee
        coin::transfer<aptos_framework::aptos_coin::AptosCoin>(
            creator,
            @AptosMinihub,
            fee
        );

        // Create new game ID
        let game_id = factory.game_count + 1;
        let creator_addr = signer::address_of(creator);
        
        // Initialize new game
        minigame::initialize_game(
            game_id,
            prompt,
            creator_addr,
            factory.admin
        );

        // Store game reference
        table::add(&mut factory.games, game_id, creator_addr);
        factory.game_count = game_id;

        // Emit creation event
        event::emit_event(&mut factory.game_created_events, GameCreatedEvent {
            game_id,
            creator: creator_addr,
            prompt,
            ai_agent: factory.admin,
            created_at: aptos_framework::timestamp::now_seconds(),
        });
    }

    public entry fun update_fee(admin: &signer, new_fee: u64) acquires MinigameFactory {
        let factory = borrow_global_mut<MinigameFactory>(@AptosMinihub);
        assert!(signer::address_of(admin) == factory.admin, E_NOT_ADMIN);
        factory.fee = new_fee;
    }

    public fun get_game_address(game_id: u64): address acquires MinigameFactory {
        let factory = borrow_global<MinigameFactory>(@AptosMinihub);
        *table::borrow(&factory.games, game_id)
    }
}