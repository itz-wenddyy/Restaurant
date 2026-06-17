let cart = [];

        function addToCart(name, price) {
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name: name, price: price, quantity: 1 });
            }
            updateCartUI();
        }

        function removeFromCart(name) {
            cart = cart.filter(item => item.name !== name);
            updateCartUI();
        }

        function clearCart() {
            cart = [];
            updateCartUI();
        }

        function updateCartUI() {
            const cartItemsContainer = document.getElementById('cart-items');
            const cartTotalContainer = document.getElementById('cart-total');
            
            cartItemsContainer.innerHTML = '';
            
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = `<li style="color: #887766; font-style: italic; padding: 10px 0;">Your tray is currently empty. Pick some pastries or brews!</li>`;
                cartTotalContainer.innerText = '0.00';
                return;
            }
            
            let total = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const li = document.createElement('li');
                li.style.display = 'flex';
                li.style.justify = 'space-between';
                li.style.alignItems = 'center';
                li.style.padding = '10px 0';
                li.style.borderBottom = '1px dashed #cbbba0';
                li.style.color = '#443322';
                
                li.innerHTML = `
                    <div>
                        <strong>${item.name}</strong> (x${item.quantity}) &ndash; $${itemTotal.toFixed(2)}
                    </div>
                    <button onclick="removeFromCart('${item.name}')" style="background: none; border: none; color: #ba4a4a; cursor: pointer; font-size: 0.9rem; font-weight: bold; padding: 5px;">Remove</button>
                `;
                
                cartItemsContainer.appendChild(li);
            });
            
            cartTotalContainer.innerText = total.toFixed(2);
        }