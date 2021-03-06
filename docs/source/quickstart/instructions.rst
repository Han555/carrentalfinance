Quickstart Instructions
=======================

1. Install Dependencies
-----------------------

As described in the :ref:`installation guide target` install following dependencies in your computer.

1. Install git - To check out the project from the GitLab
2. Install Node - Node will use to install other dependencies like Truffle and Node is the package manager for the React App. This project requires the Node version 14.x.
3. Install Ganache - We use Ganache to run a local blockchain network on your computer.
4. Install MetaMask - MetaMask is used for wallet account management.
5. Install MongoDB - Bank web server uses the MongoDB to stores the data.

2. Checkout the Project from GitLab
-----------------------------------

As described in the :ref:`checkout project target` section, 
open a terminal in your computer and execute the following commands to checkout ``microfinance`` to your computer and 
change git branch to ``level1`` branch. ::

    git clone https://gitlab.com/lahiru.uno/microfinance.git
    cd microfinance/
    git branch level1


3. Deploy Smart Contract to Ganache
------------------------------------

As described in the :ref:`deploy smart contract target` section first run Ganache on your computer.

Change directory to ``microfinance/blockchain/`` directory on your terminal and execute following command 
to deploy smart contracts into the Ganache local blockchain network. ::

    truffle migrate --reset

4. Setup MetaMask
-----------------

As described in the :ref:`metamask with ganache target` section connect MetaMask to the Ganache local blockchain.

5. Run Bank Web server
-----------------------

In your terminal change the directory to the ``bank-server`` directory and execute the following commands to 
install ``bank-server`` dependencies and run the ``bank-server``. ::

    npm install
    npm run start

6. Install React App Dependencies
---------------------------------

In your terminal change the directory to the ``bank-web-app`` directory.
Then execute the following command to install ``bank-web-app`` dependencies. ::

    npm install

7. Run Bank Web Application
---------------------------

After successfully installing React App dependencies you can execute the following command inside the ``bank-web-app`` directory to run the React App. ::

    npm run dev

8. Connect Bank Web Application to MetaMask
-------------------------------------------

In your **Google Chrome** browser navigate to ``localhost:3005`` and you will be able to see the Bank web app running on your browser.
When you load the Bank web App on your browser MetaMask will ask to connect to Bank wen app (localhost:3005).
You can connect wallet accounts as mentioned in the :ref:`connect metamask reactapp target` section.
