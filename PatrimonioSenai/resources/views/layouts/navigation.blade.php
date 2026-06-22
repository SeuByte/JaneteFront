<div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
    <x-nav-link :href="route('dashboard')" :active="request()->routeIs('dashboard')">
        {{ __('Dashboard') }}
    </x-nav-link>
    <x-nav-link :href="route('rooms.index')" :active="request()->routeIs('rooms.*')">
        {{ __('Salas') }}
    </x-nav-link>
    <x-nav-link :href="route('assets.index')" :active="request()->routeIs('assets.index')">
        {{ __('Patrimônios') }}
    </x-nav-link>
    <x-nav-link :href="route('assets.history')" :active="request()->routeIs('assets.history')">
        {{ __('Histórico de Movimentações') }}
    </x-nav-link>
    <x-nav-link :href="route('users.index')" :active="request()->routeIs('users.*')">
        {{ __('Usuários') }}
    </x-nav-link>
</div>