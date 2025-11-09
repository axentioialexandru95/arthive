<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl w-full">
        <div class="text-center mb-12">
            <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                Welcome to Arthive
            </h1>
            <p class="mt-3 text-lg text-gray-600 dark:text-gray-300">
                Select your role to continue
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
            <!-- Artist Panel -->
            <a href="/artist/login" class="group">
                <div class="h-full relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl border-2 border-transparent hover:border-purple-400 dark:hover:border-purple-500 overflow-hidden transition-all">
                    <div class="absolute top-0 right-0 w-24 h-24 bg-purple-100 dark:bg-purple-900 rounded-full -mr-12 -mt-12 opacity-30"></div>
                    <div class="relative text-center flex flex-col h-full">
                        <div class="mx-auto h-16 w-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg">
                            <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                            </svg>
                        </div>
                        <h3 class="mt-5 text-xl font-bold text-gray-900 dark:text-white">
                            Artist
                        </h3>
                        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 flex-grow">
                            Manage your artworks, albums, and exhibitions
                        </p>
                        <div class="mt-6">
                            <span class="inline-flex items-center px-4 py-2 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-sm font-semibold text-purple-700 dark:text-purple-300 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50 transition-colors">
                                Continue as Artist
                                <svg class="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </a>

            <!-- Curator Panel -->
            <a href="/curator/login" class="group">
                <div class="h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all border-2 border-transparent hover:border-teal-400 dark:hover:border-teal-500 overflow-hidden">
                    <div class="absolute top-0 right-0 w-24 h-24 bg-teal-100 dark:bg-teal-900 rounded-full -mr-12 -mt-12 opacity-30"></div>
                    <div class="relative text-center flex flex-col h-full">
                        <div class="mx-auto h-16 w-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 shadow-lg">
                            <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <h3 class="mt-5 text-xl font-bold text-gray-900 dark:text-white">
                            Curator
                        </h3>
                        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 flex-grow">
                            Organize and manage exhibitions
                        </p>
                        <div class="mt-6">
                            <span class="inline-flex items-center px-4 py-2 rounded-lg bg-teal-50 dark:bg-teal-900/30 text-sm font-semibold text-teal-700 dark:text-teal-300 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/50 transition-colors">
                                Continue as Curator
                                <svg class="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </a>

            <!-- Gallery Panel -->
            <a href="/gallery/login" class="group">
                <div class="h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all border-2 border-transparent hover:border-indigo-400 dark:hover:border-indigo-500 overflow-hidden">
                    <div class="absolute top-0 right-0 w-24 h-24 bg-indigo-100 dark:bg-indigo-900 rounded-full -mr-12 -mt-12 opacity-30"></div>
                    <div class="relative text-center flex flex-col h-full">
                        <div class="mx-auto h-16 w-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400 to-blue-500 shadow-lg">
                            <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                        </div>
                        <h3 class="mt-5 text-xl font-bold text-gray-900 dark:text-white">
                            Gallery Owner
                        </h3>
                        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 flex-grow">
                            Manage your gallery spaces and bookings
                        </p>
                        <div class="mt-6">
                            <span class="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-sm font-semibold text-indigo-700 dark:text-indigo-300 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
                                Continue as Gallery
                                <svg class="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </a>
        </div>

        <div class="mt-8 text-center">
            <a href="/" class="text-sm text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300">
                ← Back to homepage
            </a>
        </div>
    </div>
</div>
