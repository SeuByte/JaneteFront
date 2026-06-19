import '../produtos.css';

export default function Produtos() {
  return (
    <>
      {/* Esta div serve APENAS para segurar o background */}
      <div className="app-background" />
      
      {/* Todo o conteúdo da sua página de produtos vai aqui dentro */}
      <div className="app-content">
         <h1 className='agah1 text-5xl mt-4'>Nossos Produtos</h1>
        {/* Adicione aqui a sua lista de produtos, cards, etc. */}
        



<div className="inputBox_container mt-7">
  <svg className="search_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" alt="search icon">
    <path d="M46.599 46.599a4.498 4.498 0 0 1-6.363 0l-7.941-7.941C29.028 40.749 25.167 42 21 42 9.402 42 0 32.598 0 21S9.402 0 21 0s21 9.402 21 21c0 4.167-1.251 8.028-3.342 11.295l7.941 7.941a4.498 4.498 0 0 1 0 6.363zM21 6C12.717 6 6 12.714 6 21s6.717 15 15 15c8.286 0 15-6.714 15-15S29.286 6 21 6z">
    </path>
  </svg>
  <input className="inputBox" id="inputBox" type="text" placeholder="Pesquisar Produto"/>
</div>
      </div>




      <div className='cardProdutos mt-12'>
    
<div class="w-60 h-80 bg-gray-50 p-3 flex flex-col gap-1 rounded-2xl">


  <div class="h-48">
    <img src="./carIcon.png" alt="" />
  </div>



  <div class="flex flex-col gap-4">
    <div class="flex flex-row justify-between">
      <div class="flex flex-col">
        <span class="text-xl font-bold">Óleo de abóbora</span>
        <p class="text-xs text-gray-700">ID: 23432252</p>
      </div>
      <span class="font-bold  text-green-600">R$25.99</span>
    </div>
    <button class="hover:bg-green-700 text-gray-50 bg-green-500 py-2 rounded-md cursor-pointer">Adicionar ao carrinho</button>
  </div>
</div>

<div class="w-60 h-80 bg-gray-50 p-3 flex flex-col gap-1 rounded-2xl">

  
  <div class="h-48">
    <img src="./carIcon.png" alt="" />
  </div>



  <div class="flex flex-col gap-4">
    <div class="flex flex-row justify-between">
      <div class="flex flex-col">
        <span class="text-xl font-bold">Óleo de abóbora</span>
        <p class="text-xs text-gray-700">ID: 23432252</p>
      </div>
      <span class="font-bold  text-green-600">R$25.99</span>
    </div>
    <button class="hover:bg-green-700 text-gray-50 bg-green-500 py-2 rounded-md cursor-pointer">Adicionar ao carrinho</button>
  </div>
</div>

<div class="w-60 h-80 bg-gray-50 p-3 flex flex-col gap-1 rounded-2xl">

  
  <div class="h-48">
    <img src="./carIcon.png" alt="" />
  </div>



  <div class="flex flex-col gap-4">
    <div class="flex flex-row justify-between">
      <div class="flex flex-col">
        <span class="text-xl font-bold">Óleo de abóbora</span>
        <p class="text-xs text-gray-700">ID: 23432252</p>
      </div>
      <span class="font-bold  text-green-600">R$25.99</span>
    </div>
    <button class="hover:bg-green-700 text-gray-50 bg-green-500 py-2 rounded-md cursor-pointer">Adicionar ao carrinho</button>
  </div>
</div>

<div class="w-60 h-80 bg-gray-50 p-3 flex flex-col gap-1 rounded-2xl">

  
  <div class="h-48">
    <img src="./carIcon.png" alt="" />
  </div>



  <div class="flex flex-col gap-4">
    <div class="flex flex-row justify-between">
      <div class="flex flex-col">
        <span class="text-xl font-bold">Óleo de abóbora</span>
        <p class="text-xs text-gray-700">ID: 23432252</p>
      </div>
      <span class="font-bold  text-green-600">R$25.99</span>
    </div>
    <button class="hover:bg-green-700 text-gray-50 bg-green-500 py-2 rounded-md cursor-pointer">Adicionar ao carrinho</button>
  </div>
</div>

<div class="w-60 h-80 bg-gray-50 p-3 flex flex-col gap-1 rounded-2xl">

  
  <div class="h-48">
    <img src="./carIcon.png" alt="" />
  </div>



  <div class="flex flex-col gap-4">
    <div class="flex flex-row justify-between">
      <div class="flex flex-col">
        <span class="text-xl font-bold">Óleo de abóbora</span>
        <p class="text-xs text-gray-700">ID: 23432252</p>
      </div>
      <span class="font-bold  text-green-600">R$25.99</span>
    </div>
    <button class="hover:bg-green-700 text-gray-50 bg-green-500 py-2 rounded-md cursor-pointer">Adicionar ao carrinho</button>
  </div>
</div>

<div class="w-60 h-80 bg-gray-50 p-3 flex flex-col gap-1 rounded-2xl">

  
  <div class="h-48">
    <img src="./carIcon.png" alt="" />
  </div>



  <div class="flex flex-col gap-4">
    <div class="flex flex-row justify-between">
      <div class="flex flex-col">
        <span class="text-xl font-bold">Óleo de abóbora</span>
        <p class="text-xs text-gray-700">ID: 23432252</p>
      </div>
      <span class="font-bold  text-green-600">R$25.99</span>
    </div>
    <button class="hover:bg-green-700 text-gray-50 bg-green-500 py-2 rounded-md cursor-pointer">Adicionar ao carrinho</button>
  </div>

  
</div>






        
      </div>
    </>
  );
}