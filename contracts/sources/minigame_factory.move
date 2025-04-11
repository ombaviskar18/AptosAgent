module tournament_factory::factory {
    use std::signer;
    use std::vector;
    use std::table;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use tournament::game;

    struct GameFactory has key {
        game_count: u64,
        games: table::Table<u64, game::Tournament>
    }

    const ENOT_FACTORY_OWNER: u64 = 1;

    public entry fun initialize_factory(admin: &signer) {
        let addr = signer::address_of(admin);
        move_to(admin, GameFactory {
            game_count: 0,
            games: table::new()
        });
    }

    public entry fun create_new_game(
        creator: &signer,
        entry_fee: u64
    ) acquires GameFactory {
        let factory = borrow_global_mut<GameFactory>(@tournament_factory);
        let game_id = factory.game_count + 1;

        let tournament = game::initialize(
            signer::address_of(creator),
            entry_fee
        );

        table::add(&mut factory.games, game_id, tournament);
        factory.game_count = game_id;
    }

    public entry fun join_game_via_factory(
        player: &signer,
        game_id: u64,
        entry_coin: coin::Coin<AptosCoin>
    ) acquires GameFactory {
        let factory = borrow_global_mut<GameFactory>(@tournament_factory);
        let tournament = table::borrow_mut(&mut factory.games, game_id);
        game::join(tournament, signer::address_of(player), entry_coin);
    }

    public entry fun finalize_game_via_factory(
        creator: &signer,
        game_id: u64,
        top_three: vector<address>
    ) acquires GameFactory {
        let factory = borrow_global_mut<GameFactory>(@tournament_factory);
        let tournament = table::borrow_mut(&mut factory.games, game_id);
        game::finalize(tournament, signer::address_of(creator), top_three);
    }
}
