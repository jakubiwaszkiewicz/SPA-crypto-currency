## Overview

This website, built with React, enables you to choose from a list of cryptocurrencies and view market charts for the selected coins.

## Installation

1. Type `npm install` in project directory in terminal to install all the necessary dependencies for the project.
2. Enter `npm start` in terminal to compile the website

Fetch data about cryptocurrencies (including identification, name, image link, symbol, and current price) from the CoinGecko API and store it in the data state array of objects.
Store data about the selected cryptocurrencies in the selected state array.
Check the tab state to determine whether the wrap-btn has been clicked to unwrap the selected components.
Display 20 cryptocurrencies.
Pass data about cryptocurrencies from the data state to the CryptoCurrency component.
Pass filtered data about cryptocurrencies (based on the IDs in the selected array) to the Selected component.
Save the selected and tab states in local storage."