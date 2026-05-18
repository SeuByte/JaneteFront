<!DOCTYPE html>
<html lang="pt-BR" class="light">
<head>
    <meta charset="UTF-8"><title>SAFE - Portal de Portaria SENAI</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = { darkMode: 'class', theme: { extend: { colors: { senai: { blue: '#005CA9', red: '#FF0000' } } } } }
    </script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 min-h-screen font-sans flex flex-col justify-between transition-colors duration-300">

    <header class="bg-white dark:bg-slate-900 border-b-4 border-senai-blue shadow-md p-4">
        <div class="container mx-auto flex justify-between items-center">
            <span class="text-2xl font-black text-senai-blue dark:text-white">SENAI <span class="text-senai-red text-sm">S.A.F.E</span></span>
            <button id="theme-toggle" class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800"><i id="theme-toggle-icon" class="fa-solid fa-moon"></i></button>
        </div>
    </header>

    <main class="container mx-auto max-w-4xl p-4 my-auto">
        @if(session('sucesso'))
            <div class="mb-6 bg-emerald-500 text-white p-4 rounded-2xl flex items-center gap-3 shadow-lg">
                <i class="fa-solid fa-paper-plane text-xl animate-bounce"></i>
                <div>
                    <p class="font-bold">Notificações Disparadas com Sucesso!</p>
                    <p class="text-sm">O e-mail foi enviado ao Mailpit e o log do WhatsApp gerado.</p>
                </div>
            </div>
        @endif

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="md:col-span-2 bg-white dark:bg-slate-900 border rounded-3xl p-6 shadow-md flex flex-col justify-between">
                <div>
                    <h2 class="text-2xl font-black text-slate-900 dark:text-white mb-4">{{ $fluxo->nome_aluno }}</h2>
                    <p class="text-sm text-slate-500">Responsável: <strong class="text-slate-700 dark:text-slate-300">{{ $fluxo->nome_responsavel }} ({{ $fluxo->email_responsavel }})</strong></p>
                    <p class="text-sm text-slate-500 mt-1">Professor da Sala: <strong>{{ $fluxo->nome_professor }}</strong></p>
                </div>

                <div class="grid grid-cols-2 gap-3 mt-6">
                    <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center gap-2">
                        <i class="fa-solid fa-circle-check {{ $fluxo->autorizado_responsavel ? 'text-emerald-500' : 'text-slate-300' }}"></i>
                        <span class="text-xs font-bold">Aut. Responsável</span>
                    </div>
                    <div class="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center gap-2">
                        <i class="fa-solid fa-circle-check {{ $fluxo->autorizado_professor ? 'text-emerald-500' : 'text-slate-300' }}"></i>
                        <span class="text-xs font-bold">Aut. Professor</span>
                    </div>
                </div>
            </div>

            <div class="bg-white dark:bg-slate-900 border rounded-3xl p-6 shadow-md text-center flex flex-col justify-between">
                <div>
                    <span class="text-xs font-bold text-slate-400 uppercase block mb-2">Status Portaria</span>
                    <h3 class="text-xl font-extrabold {{ $fluxo->status === 'pendente' ? 'text-amber-500' : 'text-emerald-500' }} uppercase">
                        {{ $fluxo->status }}
                    </h3>
                </div>

                <div class="mt-6">
                    @if($fluxo->status === 'pendente')
                        @if($fluxo->autorizado_professor)
                            <form action="{{ route('portaria.validar', $fluxo->id) }}" method="POST">
                                @csrf
                                <button type="submit" class="w-full bg-senai-blue hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs">
                                    Validar Saída (Notificar)
                                </button>
                            </form>
                        @else
                            <button disabled class="w-full bg-slate-200 text-slate-400 font-bold py-3.5 rounded-xl cursor-not-allowed text-xs uppercase">
                                Bloqueado: Aguardando Professor
                            </button>
                        @endif
                    @else
                        <button disabled class="w-full bg-slate-100 dark:bg-slate-800 text-slate-400 font-bold py-3.5 rounded-xl cursor-not-allowed text-xs uppercase">
                            Passagem Confirmada
                        </button>
                    @endif
                </div>
            </div>
        </div>
    </main>

    <footer class="p-4 text-center text-xs text-slate-400 dark:text-slate-600 bg-white dark:bg-slate-900 border-t">
        SENAI SAFE &copy; 2026 • Rota Inicial: <a href="{{ route('cadastro.tela') }}" class="text-blue-500 underline">Voltar ao Cadastro</a>
    </footer>

    <script>
        const themeToggleBtn = document.getElementById('theme-toggle');
        const themeToggleIcon = document.getElementById('theme-toggle-icon');
        const htmlElement = document.documentElement;

        themeToggleBtn.addEventListener('click', () => {
            if (htmlElement.classList.contains('dark')) {
                htmlElement.classList.remove('dark');
                themeToggleIcon.classList.replace('fa-sun', 'fa-moon');
            } else {
                htmlElement.classList.add('dark');
                themeToggleIcon.classList.replace('fa-moon', 'fa-sun');
            }
        });
    </script>
</body>
</html>