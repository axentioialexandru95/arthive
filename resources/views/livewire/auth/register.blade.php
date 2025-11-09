<div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
        <div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                Create your account
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                Join Arthive as an artist, curator, or gallery owner
            </p>
        </div>

        <form wire:submit="register" class="mt-8 space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
            <div class="space-y-4">
                <div>
                    <label for="role" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        I am a
                    </label>
                    <select wire:model.live="role" id="role" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        <option value="artist">Artist</option>
                        <option value="curator">Curator</option>
                        <option value="gallery">Gallery Owner</option>
                    </select>
                    @error('role') <span class="text-red-600 text-sm">{{ $message }}</span> @enderror
                </div>

                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Full Name
                    </label>
                    <input wire:model="name" id="name" type="text" required class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    @error('name') <span class="text-red-600 text-sm">{{ $message }}</span> @enderror
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                    </label>
                    <input wire:model="email" id="email" type="email" required class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    @error('email') <span class="text-red-600 text-sm">{{ $message }}</span> @enderror
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password
                    </label>
                    <input wire:model="password" id="password" type="password" required class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    @error('password') <span class="text-red-600 text-sm">{{ $message }}</span> @enderror
                </div>

                <div>
                    <label for="password_confirmation" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Confirm Password
                    </label>
                    <input wire:model="password_confirmation" id="password_confirmation" type="password" required class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    @error('password_confirmation') <span class="text-red-600 text-sm">{{ $message }}</span> @enderror
                </div>

                @if($role === 'artist')
                    <div>
                        <label for="specialization" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Specialization (optional)
                        </label>
                        <input wire:model="specialization" id="specialization" type="text" placeholder="e.g., Painter, Sculptor, Photographer" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        @error('specialization') <span class="text-red-600 text-sm">{{ $message }}</span> @enderror
                    </div>
                @endif

                @if($role === 'gallery')
                    <div>
                        <label for="gallery_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Gallery Name
                        </label>
                        <input wire:model="gallery_name" id="gallery_name" type="text" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        @error('gallery_name') <span class="text-red-600 text-sm">{{ $message }}</span> @enderror
                    </div>

                    <div>
                        <label for="gallery_description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Gallery Description (optional)
                        </label>
                        <textarea wire:model="gallery_description" id="gallery_description" rows="3" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
                        @error('gallery_description') <span class="text-red-600 text-sm">{{ $message }}</span> @enderror
                    </div>
                @endif

                <div>
                    <label for="location" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Location (optional)
                    </label>
                    <input wire:model="location" id="location" type="text" placeholder="City, Country" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    @error('location') <span class="text-red-600 text-sm">{{ $message }}</span> @enderror
                </div>

                <div>
                    <label for="bio" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Bio (optional)
                    </label>
                    <textarea wire:model="bio" id="bio" rows="3" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
                    @error('bio') <span class="text-red-600 text-sm">{{ $message }}</span> @enderror
                </div>
            </div>

            <div>
                <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Create Account
                </button>
            </div>

            <div class="text-center">
                <a href="/login" class="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                    Already have an account? Sign in
                </a>
            </div>
        </form>
    </div>
</div>
