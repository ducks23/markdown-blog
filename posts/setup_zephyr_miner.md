---
title: 'How to Set Up Zephyr Mining Rig with XMRig'
date: '2023-12-31'
---

![Pepe Link](https://raw.githubusercontent.com/ducks23/markdown-blog/main/images/zephyr.webp)


# Background

In this post we will set up a mining rig to mine Zephyr. Im using an application called xmring on ubuntu ([install from usb](https://help.ubuntu.com/community/Installation/FromUSBStick))to mine zephyr.

At the end of this you will be able to mine zephyr and have funds continuously deposited into your wallet with only the effort of set up and very minimal maintenance.

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

Congrats you are now mining crypto currency from the ether! After doing some research on the best processors to use to mine efficiently, using the AMD Ryzen 9 chips could mine anywhere from 2 to 4 zpehyr per month.


## Check your progress

You can check your progress of you hash rate, payment history, and estimated earnings at https://zephyr.herominers.com/# by entering you wallet address.