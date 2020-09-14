<template>
  <div class="row">
    <div class="col-md-8  mx-auto">
      <h2>Treanding Books In {{ genre }}</h2>
      <div class="row">
        <div
          class="card col-md-4 col-sm-6 m-1"
          v-for="book in books"
          :key="book._id"
        >
          <div class="d-flex justify-content-between">
            <h6 class="card-title">{{ book.title }}</h6>
            <span>By :{{ book.author }}</span>
          </div>
          <div class="card-body" style="height:200px;">
            <a>
              <img
                class="img-fluid h-100"
                src="https://m.media-amazon.com/images/I/51WmZ6UZYdL._SY346_.jpg"
                alt="Card image cap"
            /></a>
          </div>
          <div class="card-footer">
            <a href="#" @click="downloadBook(book.file)" class="card-link"
              >Down</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../helpers/axios.js";
export default {
  props: {
    id: {
      required: true
    }
  },
  data() {
    return {
      books: [],
      genre: "Loza"
    };
  },
  methods: {
    downloadBook(filename) {
      axios
        .get("/book/download/" + filename, {
          responseType: "blob"
        })
        .then(res => {
          var fileUrl = window.URL.createObjectURL(res.data);
          var el = document.createElement("a");
          el.href = fileUrl;
          el.setAttribute("download", filename);
          document.body.append(el);
          el.click();
        })
        .catch(err => {
          console.log("err :>> ", err);
        });
    }
  },
  created() {
    axios
      .get("/book/genre/" + this.id)
      .then(res => {
        this.books = res.data;
      })
      .catch(err => {
        console.log("err :>> ", err);
      });
  }
};
</script>

<style scoped></style>
