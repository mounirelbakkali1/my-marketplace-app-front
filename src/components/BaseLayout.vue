<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <slot name="navigation"></slot>
    </header>
    <main>
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
<style>
.main {
  margin-top: 70px;
}
footer {
  margin-top: 3%;
}
</style>
