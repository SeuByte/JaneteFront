<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Cadastrar Nova Sala') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <form method="POST" action="{{ route('rooms.store') }}">
                    @csrf
                    <div>
                        <x-input-label for="name" :value="__('Nome da Sala / Laboratório')" />
                        <x-text-input id="name" class="block mt-1 w-full" type="text" name="name" required autofocus />
                    </div>

                    <div class="mt-4">
                        <x-input-label for="description" :value="__('Descrição')" />
                        <x-text-input id="description" class="block mt-1 w-full" type="text" name="description" />
                    </div>

                    <div class="mt-4">
                        <x-input-label for="user_id" :value="__('Professor Responsável')" />
                        <select id="user_id" name="user_id" class="block mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" required>
                            <option value="">Selecione um Professor</option>
                            @foreach($teachers as $teacher)
                                <option value="{{ $teacher->id }}">{{ $teacher->name }} ({{ $teacher->email }})</option>
                            @endforeach
                        </select>
                    </div>

                    <div class="flex items-center justify-end mt-6">
                        <button type="submit" class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700">
                            Salvar Sala
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>