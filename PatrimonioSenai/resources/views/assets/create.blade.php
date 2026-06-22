<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Cadastrar Objeto Patrimonial') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <form method="POST" action="{{ route('assets.store') }}">
                    @csrf
                    <div>
                        <x-input-label for="asset_tag" :value="__('Código do Patrimônio (Tag Unica)')" />
                        <x-text-input id="asset_tag" class="block mt-1 w-full" type="text" name="asset_tag" placeholder="Ex: PAT-2026-001" required />
                    </div>

                    <div class="mt-4">
                        <x-input-label for="name" :value="__('Nome do Objeto')" />
                        <x-text-input id="name" class="block mt-1 w-full" type="text" name="name" placeholder="Ex: Projetor Epson" required />
                    </div>

                    <div class="mt-4">
                        <x-input-label for="description" :value="__('Descrição/Especificações')" />
                        <x-text-input id="description" class="block mt-1 w-full" type="text" name="description" />
                    </div>

                    <div class="mt-4">
                        <x-input-label for="room_id" :value="__('Sala de Destino Inicial')" />
                        <select id="room_id" name="room_id" class="block mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" required>
                            <option value="">Selecione a Sala</option>
                            @foreach($rooms as $room)
                                <option value="{{ $room->id }}">{{ $room->name }} — (Responsável: {{ $room->teacher->name }})</option>
                            @endforeach
                        </select>
                    </div>

                    <div class="flex items-center justify-end mt-6">
                        <button type="submit" class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700">
                            Cadastrar Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>