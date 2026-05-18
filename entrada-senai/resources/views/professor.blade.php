<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8"><title>SAFE - Painel do Professor</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 p-6">
    <div class="max-w-4xl mx-auto">
        @if(session('sucesso'))
            <div class="bg-emerald-500 text-white p-4 rounded-xl mb-4 font-bold">{{ session('sucesso') }}</div>
        @endif
        <div class="bg-white p-6 rounded-3xl shadow-md border-t-4 border-red-500">
            <h2 class="text-2xl font-black text-red-500 mb-4">Sala de Aula • Chamada de Liberação</h2>
            <p class="text-slate-500 text-sm mb-6">Lista de alunos aguardando liberação do professor para irem à portaria.</p>

            <table class="w-full border-collapse">
                <thead>
                    <tr class="bg-slate-100 text-left text-xs font-bold uppercase text-slate-600">
                        <th class="p-3">Aluno</th><th class="p-3">Professor</th><th class="p-3">Autorização em Sala</th><th class="p-3">Ação</th>
                    </tr>
                </thead>
                <tbody class="divide-y">
                    @forelse($alunos as $aluno)
                        <tr>
                            <td class="p-3 font-bold">{{ $aluno->nome_aluno }}</td>
                            <td class="p-3 text-slate-600">{{ $aluno->nome_professor }}</td>
                            <td class="p-3">
                                <span class="px-2 py-1 text-xs font-bold rounded {{ $aluno->autorizado_professor ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700' }}">
                                    {{ $aluno->autorizado_professor ? 'Liberado' : 'Aguardando Professor' }}
                                </span>
                            </td>
                            <td class="p-3 flex gap-2">
                                @if(!$aluno->autorizado_professor)
                                    <form action="{{ route('professor.autorizar', $aluno->id) }}" method="POST">
                                        @csrf
                                        <button class="bg-red-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-red-600">Autorizar Saída</button>
                                    </form>
                                @endif
                                <a href="{{ route('portaria.exibir', $aluno->id) }}" class="bg-blue-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-blue-700">Ir para Portaria</a>
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="4" class="p-4 text-center text-slate-400">Nenhum aluno na fila. Cadastre um na tela inicial!</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>