
Application Overview
=====================

The Microfinance project is about deploying new ERC20 token and use as a alternative currency type. 
We assume that these tokens were use by non-banking people. 
This project has 3 main user roles.

1. ``Bank``: Bank personals who is responsible in ERC20 operations
2. ``Borrower`` : The non-banking people who is getting tokens as loans from the Bank.
3. ``Broker`` : The role who is connecting Bank and Borrowers.

This project is consists of 3 main projects. 

1. Bank web application - ``bank-web-application``
2. Bank web serve application - ``bank-server``
3. Blockchain (Truffle project for smart contract development) - ``blockchain``

These projects use different technologies to fullfil the different requirements.
These applications are owned by the Bank and used by stakeholders mentioned above.
These project are depending on each other. The following architecture diagram shows the connections between these projects.

Layered Architecture
--------------------

Layered architecture diagram of the system.

.. image:: ../images/layered-architecture.png


In this system we use 3 smart contracts deployed in to the blockchain. 
These smart contracts were accessed by Bank web application.
The Bank web application communicates with both Bank web server and the blockchain.

In the following sections we will discuss how to run these projects, their dependencies, and functioanlities in detail.