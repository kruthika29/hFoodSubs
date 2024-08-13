function subscribe(plan) {
    fetch('/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ plan: plan })
    })
    .then(response => response.json())
    .then(data => {
        alert('Subscribed to ' + plan + ' plan successfully!');
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
