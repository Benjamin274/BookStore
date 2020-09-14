<template>
  <div class="slideshow-container">
    <div class="card" v-for="(item, index) in onShowBooks" :key="index">
      <h3 class="title">{{ item.title }}</h3>
      <div class="bar">
        <div class="emptybar"></div>
        <div class="filledbar"></div>
      </div>
      <div class="circle">
        <img
          src="https://m.media-amazon.com/images/I/51WmZ6UZYdL._SY346_.jpg"
          style="width:100%"
        />
      </div>
    </div>
    <a class="prev" @click="slidePhoto(-1)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 12l2-4-11 4 11 4-2-4z"
        />
      </svg>
    </a>
    <a class="next" @click="slidePhoto(1)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          d="M22 12c0 5.514-4.486 10-10 10s-10-4.486-10-10 4.486-10 10-10 10 4.486 10 10zm-22 0c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7 4l11-4-11-4 2 4-2 4z"
        />
      </svg>
    </a>
  </div>
</template>

<script>
import axios from "../../../helpers/axios.js";
import { ref } from "vue";
export default {
  setup() {
    let books = ref([]);
    let onShowBooks = ref([]);
    let currentIndex = ref(0);
    const getBooks = () => {
      axios
        .get("/book")
        .then(response => {
          books.value = response.data;
          onShowBooks.value = books.value.slice(0, 3);
          console.log("response :>> ", response.data);
        })
        .catch(error => {
          console.log("error :>> ", error);
        });
    };
    const slidePhoto = direction => {
      if (!currentIndex.value) {
        currentIndex.value = direction > 0 ? 1 : 0;
      } else {
        currentIndex.value += direction;
      }
      onShowBooks.value = books.value.slice(
        currentIndex.value,
        currentIndex.value + 3
      );
    };
    getBooks();
    return { getBooks, onShowBooks, slidePhoto, currentIndex };
  }
};
</script>

<style scoped>
.slideshow-container {
  position: relative;
  display: flex;
}
.card {
  display: flex;
  height: 400px;
  width: 250px;
  background-color: #17141d;
  border-radius: 10px;
  box-shadow: -1rem 0 3rem #000;
  /*   margin-left: -50px; */
  transition: 0.4s ease-out;
}

.card:hover {
  transform: translateY(-20px);
  transition: 0.4s ease-out;
}

.card:hover ~ .card {
  position: relative;
  left: 50px;
  transition: 0.4s ease-out;
}

.title {
  color: white;
  font-weight: 300;
  position: absolute;
  left: 20px;
  top: 15px;
}

.bar {
  position: absolute;
  top: 100px;
  left: 20px;
  height: 5px;
  width: 100%;
}

.emptybar {
  background-color: #2e3033;
  width: 100%;
  height: 100%;
}

.filledbar {
  position: absolute;
  top: 0px;
  z-index: 3;
  width: 0px;
  height: 100%;
  background: rgb(0, 154, 217);
  background: linear-gradient(
    90deg,
    rgba(0, 154, 217, 1) 0%,
    rgba(217, 147, 0, 1) 65%,
    rgba(255, 186, 0, 1) 100%
  );
  transition: 0.6s ease-out;
}

.card:hover .filledbar {
  width: 120px;
  transition: 0.4s ease-out;
}

.circle {
  position: absolute;
  top: 150px;
  left: calc(50% - 60px);
}

.stroke {
  stroke: white;
  stroke-dasharray: 360;
  stroke-dashoffset: 360;
  transition: 0.6s ease-out;
}

svg {
  fill: #17141d;
  stroke-width: 2px;
}

.card:hover .stroke {
  stroke-dashoffset: 100;
  transition: 0.6s ease-out;
}
.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  color: rgb(243, 10, 10);
  font-weight: bold;
  font-size: 28px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: -30px;
}
.prev {
  left: -30px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
