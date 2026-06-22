<x-app-layout>
    <x-slot name="header">
        <div class="flex justify-between items-center">
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                {{ __('Inventário de Patrimônios') }}
            </h2>
        </div>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            
            <div class="mb-6 flex justify-end">
                <a href="{{ route('assets.create') }}" class="inline-flex items-center px-4 py-2 bg-indigo-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-800 focus:bg-indigo-800 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 shadow-md">
                    + Cadastrar Objeto
                </a>
            </div>

            @if(session('success'))
                <div class="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-sm">
                    {{ session('success') }}
                </div>
            @endif

            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tag / Cód</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sala Atual</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Responsável</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações / Realocar</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        @forelse($assets as $asset)
                            <tr class="hover:bg-gray-50 transition-colors">
                                <td class="px-6 py-4 whitespace-nowrap font-mono text-sm bg-gray-50 text-gray-600">{{ $asset->asset_tag }}</td>
                                <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{{ $asset->name }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-blue-600 font-semibold">{{ $asset->room->name ?? 'Sem Sala' }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-gray-500">{{ $asset->room->teacher->name ?? 'Sem Responsável' }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    <form method="POST" action="{{ route('assets.relocate', $asset->id) }}" class="flex items-center space-x-2">
                                        @csrf
                                        <select name="destination_room_id" class="text-xs p-1 border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500" required>
                                            <option value="">Mudar para sala...</option>
                                            @foreach($allRooms as $room)
                                                @if($room->id !== $asset->room_id)
                                                    <option value="{{ $room->id }}">{{ $room->name }}</option>
                                                @endif
                                            @endforeach
                                        </select>
                                        <button type="submit" class="px-3 py-1 bg-gray-800 text-white text-xs font-semibold rounded hover:bg-gray-700 transition-colors">
                                            Mover
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="5" class="px-6 py-4 text-center text-gray-500">Nenhum patrimônio alocado ainda.</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-app-layout>