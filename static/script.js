

document.addEventListener('DOMContentLoaded', () => {
  // Seleccionar el botón y el párrafo de resultado
  const button = document.getElementById('send-button');
  const userInput = document.getElementById('user-text');

  const renderChatInput = (userInput, isBot = false) => {
    const chatbox = document.getElementById('chatbox');
    const { innerHTML: chatboxInnerHTML} = chatbox;

    chatbox.innerHTML = `
      ${chatboxInnerHTML} 
      <p class=${isBot ? 'botText' : 'userText'}> 
        <span> 
          ${userInput} 
        </ span>
      </ p>`
  };

  // Agregar un evento click al botón
  button.addEventListener('click', async () => {
    const { value: userText } = userInput;
    renderChatInput(userText)
    document.getElementById('userInput').scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
    try {
      const response = await fetch('http://127.0.0.1:5000/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ msg: userText }),
      })

      const decoder = new TextDecoder();

      const reader = response.body.getReader();

      const { value } = await reader.read();

      const chatbotResponse = decoder.decode(value);

      renderChatInput(chatbotResponse, true)
      
    } catch (error) {
      console.log(error);
      console.log('there is an error :(');      
    }

  });
});
