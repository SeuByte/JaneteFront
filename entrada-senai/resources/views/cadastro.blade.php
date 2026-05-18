<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8"><title>SAFE - Cadastro Inicial</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 text-slate-800 p-6">
    <div class="max-w-xl mx-auto bg-white rounded-3xl p-8 shadow-md border-t-4 border-blue-600">
        <h2 class="text-2xl font-black text-blue-600 mb-2">SENAI SAFE • Cadastro de Fluxo</h2>
        <p class="text-slate-500 text-sm mb-6">Cadastre o aluno vinculando seu professor e o e-mail do responsável.</p>
        
        <form action="{{ route('cadastro.salvar') }}" method="POST" class="space-y-4">
            @csrf
            <div>
                <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Nome do Aluno</label>
                <input type="text" name="nome_aluno" required class="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: Pedro Silva">
            </div>
            <div>
                <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Professor Responsável (Sala)</label>
                <input type="text" name="nome_professor" required class="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: Prof. Marcos">
            </div>
            <div>
                <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Nome do Responsável (Pai/Mãe)</label>
                <input type="text" name="nome_responsavel" required class="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: Carlos Silva">
            </div>
            <div>
                <label class="block text-xs font-bold uppercase text-slate-500 mb-1">E-mail do Responsável (Para o Mailpit)</label>
                <input type="email" name="email_responsavel" required class="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: carlos@email.com">
            </div>
            <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition uppercase text-sm tracking-wider">
                Cadastrar e Iniciar Fluxo
            </button>
        </form>
    </div>
</body>
</html>