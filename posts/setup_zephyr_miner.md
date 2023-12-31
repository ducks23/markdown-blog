---
title: 'How to Set Up Zephyr Mining Rig with XMRig'
date: '2023-12-31'
---

![Pepe Link](https://raw.githubusercontent.com/ducks23/markdown-blog/main/images/zephyr.webp)


# Background

In this Article we will go about setting up a mining rig to mine Zephyr. We will use xmrig as the software that will be running
the mining algorithm. I'm using ubuntu ([install from usb](https://help.ubuntu.com/community/Installation/FromUSBStick)) which is 
a common linux distribution but can also be run on mac os or windows.

At the end of this you will be able to mine zephyr and have funds deposited directly into your wallet with only the effort of set up.

## Resources

[Zephyr Hero Miners](https://zephyr.herominers.com/#). 



# How to Set Up Zephyr Mining rig
1. First you will need to Create a Zephyr wallet. This is where your mined zephyr will be deposited to. 
   - Create an account
    - Save your key file
    - Grab you wallet id for later which is in the format of something similair to: ```ZEPHYR@$EASRR#$RWEFDSAF234wsdfa432awsd```

2.  To start mining this you will need to download the xmr rig software that works for your operating system.
    - Download xmrig[here.](https://xmrig.com/download)
    - Unzip files to your preferred location.

3. Start Mining Rig!


To start your mining rig you will need 2 values. Your wallet address and the address of the mining pool closest to you geographically.

Here is the list of available pools to use from https://zephyr.herominers.com/#


![Mining pools](https://raw.githubusercontent.com/ducks23/markdown-blog/main/images/mining_pools.png)


## Create Execution Script
 
The execution script gives instructions to how you want to set up your mining rig. It tells xmrig what mining pool to use
This file needs to be run as an root otherwise you will get some errors. (On windows run file as administrator and the execution command can be found at bottom of the page [here](https://zephyr.herominers.com/#how-to-mine-zephyr-zeph).

Copy this command into your terminal and replace ```YOUR_ZEPH_WALLET_ADDRESS``` with your wallet address and you can replace ```YOUR_WORKER_NAME``` with what you want to name the computer you have running.


```bash 
echo "#!/bin/bash \n\nsudo ./xmrig --donate-level 1 -o us2.zephyr.herominers.com:1123 -u YOUR_ZEPH_WALLET_ADDRESS -p YOUR_WORKER_NAME -a rx/0 -k" > script.sh 

chmod +x script.sh
```
### Run Your Mining Rig
```
./script.sh
```

Congrats you are now mining free money from the interwebs! I've done my research and most CPU's won't mine crypto very fast but if you use an AMD Ryzen 9 you should be able to mine a couple zephyr coins a month and make anywhere from 2 to 4 zpehyrs.


![Woajks](https://raw.githubusercontent.com/ducks23/markdown-blog/main/images/wojack_beliebes.JPG
)

Be safe.

