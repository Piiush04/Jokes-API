document.getElementById("jokeForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const categoryInput = document.getElementById('category').value;
    const resultBox = document.getElementById('resultBox');

    resultBox.innerHTML = `<p style="padding: 5px;">Loading....</p>`;

    try{
        const response = await fetch("/api/getJoke", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                category: categoryInput
            })
        });

        const data = await response.json();

        if(data.success){
            resultBox.innerHTML = `
                <h3 style="padding: 5px;">Ye lo tumhara joke:</h3>
                <p style="font-size: 18px; font-weight: bold; padding: 5px;">" ${data.joke} "</p>
            `;
        }else{
            resultBox.innerHTML = `<h3 style="color: red;">${data.error}</h3>`;
        }
    }catch(error){
        console.error("Fetch Error:", error);
        resultBox.innerHTML = `<h3 style="color: red; padding: 5px">Frontend se request bhejne mein dikkat hui.</h3>`;
    }
});