<div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
        <div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                Sign in to your account
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                Access your Arthive panel
            </p>
        </div>

        <form wire:submit="login" class="mt-8 space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
            <div class="space-y-4">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email address
                    </label>
                    <input
                        wire:model="email"
                        id="email"
                        type="email"
                        autocomplete="email"
                        required
                        class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                    @error('email') <span class="text-red-600 text-sm">{{ $message }}</span> @enderror
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password
                    </label>
                    <input
                        wire:model="password"
                        id="password"
                        type="password"
                        autocomplete="current-password"
                        required
                        class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                    @error('password') <span class="text-red-600 text-sm">{{ $message }}</span> @enderror
                </div>

                <div class="flex items-center">
                    <input
                        wire:model="remember"
                        id="remember"
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    >
                    <label for="remember" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                        Remember me
                    </label>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Sign in
                </button>
            </div>

            <div class="text-center space-y-2">
                <div>
                    <a href="/register" class="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                        Don't have an account? Register
                    </a>
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                    You will be redirected to your panel based on your role
                </div>
            </div>
        </form>
    </div>
</div>
