script {
    use AptosFramework::aptos_coin;
    use AptosFramework::coin;
    
    fun main(admin: &signer) {
        // Initialize factory
        let admin_addr = @AptosMinihub;
        let fee = 100000000; // 0.1 APT
        
        // Initialize factory contract
        AptosMinihub::minigame_factory::initialize_factory(admin, fee);
    }
}