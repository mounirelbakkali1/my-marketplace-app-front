<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <slot name="navigation"></slot>
    </header>
    <main class="flex-grow">
      <slot name="main"></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: "BaseLayout",
};
</script>
