---
title: 'Crypto AHHHHHH'
date: '2023-12-19'
---

![Pepe Link](https://github.com/ducks23/markdown-blog/blob/main/images/pepe_link.JPG)

&nbsp;&nbsp;&nbsp;&nbsp; In the past couple of months we have seen bitcoin rise from the bottom of 15k all the way to 44k I have become very inspired by a lot of the technologies in the DeFi Landscape. A lot of people talk about how bitcoin will replace dollars and all that but I believe that we are in the very infant stages of crypto. I would compare it to the time when we all had dial up and had to connect to the internet through AOL. At that time it was incredible what could be done but looking back in retrospect it seemed like the stone ages.
In 2023 I think that there are some incredible financial technologies in the crypto world, but they're not quite efficient or cost effective enough but I think that time will come. 


&nbsp;&nbsp;&nbsp;&nbsp; Some of my favorite technologies I've found so far are Thorchain, Shapeshift, Chainlink, and Zephyr.

&nbsp;&nbsp;&nbsp;&nbsp; Thorchain is a Decentralized exchange that allows you to take out collateralized loans with no interest. For example you can take a loan out against your bitcoin for 44k and then you will receive 44k USD to do whatever you want with and there is zero interest or time period that you have to pay it back in. It's funny, you tell people this and they think you're crazy. HOW CAN THERE BE A LOAN WITHOUT INTEREST?! everyone exclaims. Well that's because crypto is a replacement for bank and bankers operate off of greed and decentralized exchanges operate off of smart contracts. The code that is exchanging your coin for another coin doesn't need interest off of your loan because we as individuals on earth can create a system that is fair and doesn't take advantage of people. We can create code that governs contractual agreements that we consent to.

&nbsp;&nbsp;&nbsp;&nbsp;Another tech that interests me is this Coin called zephyr. It's similair to bitcoin as in there is a fixed amount and you have to mine them to own them or buy them on an exchange. The only difference is that it has a completely private blockhain meaning other people can't see who is sending what to your wallet. On bitcoin and ethereum there is a public ledger so everyone can see every transaction. 

Zephyr is also really interesting because it's so new the current market cap is around 58 million and has only been charting since this summer so it has a ton of room to grow. The price exploded up to $50 and is sitting at around $20. I learned that it is actually quite easy to mine this coin so I wanted to show you how in this article.


# How to Set Up Zephyr Mining
1. First you will need to Create a Zephyr wallet. This is where your mined zephyr will be deposited to. 
    - Create an account
    - Save your key file
    - Grab you wallet id for later

2.  To start mining this you will need to download the xmr rig software that works for your operating system here
    - Download software [here](https://xmrig.com/download
)
    - Unzip files to your preferred location

3. Start Mining!
    - In the folder of your extracted files you will need to execute the `xmrig` file. I'm using linux so I created a file that will run your program with the correct configuration
    - the command can be found


Create a start script with the correct mining pool which can be found at [Zephyr Hero Miners](https://zephyr.herominers.com/#). You will need to pick the closest mining pool geographically. I'm in the midwest so I'm going to pick the North American East pool: us2.zephyr.herominers.com:1123. Then your wallet address is the address you stored from step one and the worker name can be whatever you want 

### Create Run Script
```bash 
echo "sudo ./xmrig --donate-level 1 -o us2.zephyr.herominers.com:1123 -u YOUR_ZEPH_WALLET_ADDRESS -p YOUR_WORKER_NAME -a rx/0 -k" > script.sh 

chmod +x script.sh
```
### Run your mining rig
```
./script.sh
```

Once that is downloaded you can unzip the software into a folder
and can start running

