export async function getData() {
  const path = "../../../../data.json";
  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`status(${response.status} - ${response.statusText})`);
    }
    return await response.json();
  } catch (error) {
    console.log(`Erro na busca de dados: ${error.stack}`);
  }
}