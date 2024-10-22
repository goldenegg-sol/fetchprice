document.getElementById('fetchPriceBtn').addEventListener('click', async () => {
    const tokenAddress = document.getElementById('tokenAddress').value.trim();
    const priceDisplay = document.getElementById('priceDisplay');
    const tokenDetails = document.getElementById('token-details');

    // Clear previous price and details
    priceDisplay.innerHTML = '';
    tokenDetails.innerHTML = '';

    if (!tokenAddress) {
        priceDisplay.innerHTML = 'Please enter a token address.';
        return;
    }

    // Construct the API URL with vsToken=USDC
    const url = `https://price.jup.ag/v6/price?ids=${tokenAddress}&vsToken=USDC`;
    const requestOptions = {
        method: 'GET',
    };

    try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();

        // Check if data contains the required token information
        if (data && data.data) {
            const tokenData = data.data[tokenAddress];

            // Check if the token data exists
            if (tokenData) {
                const usdcPrice = tokenData.price; // Fetch USDC price
                priceDisplay.innerHTML = `Current Price of ${tokenData.mintSymbol} in USDC: $${usdcPrice}`;
                
                // Display additional token details
                const details = `
                    <div class="detail-label">Token Address:</div>
                    <div class="detail-value">${tokenAddress}</div>
                    <div class="detail-label">Price in USDC:</div>
                    <div class="detail-value">$${usdcPrice}</div>
                `;
                tokenDetails.innerHTML = details;
            } else {
                priceDisplay.innerHTML = 'Error: Unable to fetch price data for the given token address.';
            }
        } else {
            priceDisplay.innerHTML = 'Error: Invalid response format.';
        }
    } catch (error) {
        priceDisplay.innerHTML = 'Failed to fetch token price. Please try again.';
        console.error('Error fetching price:', error);
    }
});
