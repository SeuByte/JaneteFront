<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Histórico de Movimentações de Patrimônio') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sala de Origem</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sala de Destino</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Movimentado por</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data/Hora</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        @forelse($histories as $history)
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{{ $history->asset->name }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-red-500 font-semibold">{{ $history->originRoom->name ?? 'Cadastro Inicial' }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-green-600 font-semibold">{{ $history->destinationRoom->name }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-gray-700">{{ $history->user->name }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">{{ $history->created_at->format('d/m/Y H:i') }}</td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="5" class="px-6 py-4 text-center text-gray-500">Nenhuma movimentação registrada no histórico ainda.</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-app-layout>