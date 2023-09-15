export async function getData() {
  try {
    const response = await fetch('./data.json');

    if (!response.ok) {
      throw new Error(`status(${response.status} - ${response.statusText})`);
    }
    return await response.json();
  } catch (error) {
    console.log(`Erro na busca de dados: ${error.stack}`);
  }
}