<template>
  	<header class="border-b border-surface bg-background-primary">
		<div class="mx-auto flex w-full max-w-6xl items-center justify-between py-6 px-3">
			<div class="logo">
				<a href="/">
					<img src="/images/Logo.png" alt="Logo" />
				</a>
			</div>

			<div class="flex items-center gap-4">
				<NuxtLink to="/" class="text-md font-bold text-gray-500 hover:text-gray-900 px-3">Home</NuxtLink>
				<NuxtLink to="#" class="text-md font-bold text-gray-600 hover:text-gray-900 px-3">Features</NuxtLink>
				<NuxtLink to="#" class="text-md font-bold text-gray-600 hover:text-gray-900 px-3">Community</NuxtLink>
				<NuxtLink to="#" class="text-md font-bold text-gray-600 hover:text-gray-900 px-3">Blog</NuxtLink>
				<NuxtLink to="#" class="text-md font-bold text-gray-600 hover:text-gray-900 px-3">Pricing</NuxtLink>

				<NuxtLink to="#" class="flex justify-between items-center text-md font-bold hover:bg-green-600 bg-[#4CAF4F] text-white px-6 py-3 rounded-md">
					Register Now

					<svg width="16" height="16" class="ml-4" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
						<path d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414" fill="#fff"/>
					</svg>

				</NuxtLink>
			</div>
		</div>
	</header>
</template>

<script setup>
</script>