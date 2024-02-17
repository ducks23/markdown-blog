---
title: 'Neovim Notes'
date: '2024-01-29'
---


# AVAX Notes


1. AVAX
    1. AVAX Validatior nodes
       * A Key store user is needed to create a subnet
       * there are three chains. 
         1. p-chain: is for platform management. It handles requests related to
            the validator, the blockhain and the subnet
         2. C-chain is for contract management. It is based on evml hence its
            api is almost identiacl to other evm protols. it has both rpc  
            and websocket endpoints and it handles rquests for smart contracts
         3. X-chain is for asset exchange. it is avax's native platforml its
         used for createing trading assets like avax and nfts

```javascript 
function() {

}
```
docker run --name chainlink:latest -v ~/.chainlink-goerli:/chainlink -it -p 6688:6688 --add-host=host.docker.internal:host-gateway smartcontract/chainlink:2.8.0 node -config /chainlink/config.toml -secrets /chainlink/secrets.toml start
