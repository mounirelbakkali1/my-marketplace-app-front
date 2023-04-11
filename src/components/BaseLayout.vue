<template>
  <header>
    <slot name="navigation"></slot>
  </header>
  <main class="main">
    <slot name="main"></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</template>

<script>
export default {
  name: "BaseLayout",
  // mounted() {
  //   this.updateSideBarTopMargin();
  //   window.addEventListener("resize", () => {
  //     this.updateSideBarTopMargin();
  //   });
  // },
  // methods: {
  //   updateSideBarTopMargin() {
  //     const navbar = document.querySelector(".navbar");
  //     const navbarHeight = navbar.getBoundingClientRect().height;
  //     const main = document.querySelector(".main");
  //     main.style.marginTop = `${navbarHeight}px`;
  //   },
  // },
};
</script>
<style></style>
