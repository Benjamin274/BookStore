<template>
  <div class="container">
    <div class="form-row">
      <ul class="col-md-6 mx-auto">
        <li v-for="(err, i) in errors" :key="i" class="text-danger">
          {{ err }}
        </li>
      </ul>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label>Title</label>
        <input type="text" class="form-control" v-model="book.title" />
      </div>
      <div class="form-group col-md-6">
        <label>Author</label>
        <input type="text" class="form-control" v-model="book.author" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-4">
        <label for="inputState">Genre</label>
        <select v-model="book.genre" class="form-control">
          <option selected>Choose...</option>
          <option :value="genre._id" v-for="genre in genres" :key="genre._id">
            {{ genre.name }}
          </option>
        </select>
      </div>
      <div class="form-group offset-md-4 col-md-4">
        <label>Upload Book</label>
        <input
          type="file"
          class="form-control-file"
          @change="onFileChange"
          name="bookFile"
        />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6 mx-auto">
        <label> Book Description</label>
        <textarea
          class="form-control"
          cols="30"
          rows="5"
          v-model="book.summary"
        ></textarea>
      </div>
    </div>
    <button
      @click="saveBook"
      class="btn btn-primary"
      :disabled="!book.selectedFile"
    >
      Upload
    </button>
    <br />
    <progressBar max="100" :uploadPercentage="uploadPercentage"></progressBar>
    <br />
  </div>
</template>

<script>
import axios from "../../helpers/axios.js";
import { useGenreHelper } from "../../helpers/helpermethods.js";
import { ref, reactive } from "vue";
import progressBar from "../components/partials/ProgressBar.vue";
export default {
  components: {
    progressBar
  },
  setup() {
    const { genres } = useGenreHelper();
    let errors = ref([]);
    let uploadPercentage = ref(0);
    let book = reactive({
      title: "",
      author: "",
      summary: "",
      genre: "",
      selectedFile: ""
    });
    const onFileChange = e => {
        book.selectedFile = e.target.files[0];
      },
      saveBook = () => {
        if (checkForm()) {
          const formData = new FormData();
          formData.append("bookFile", book.selectedFile); // appending file
          formData.append("title", book.title); // appending file
          formData.append("author", book.author); // appending file
          formData.append("genre", book.genre); // appending file
          formData.append("summary", book.summary); // appending file
          axios
            .post("/book", formData, {
              onUploadProgress: function(progressEvent) {
                uploadPercentage.value = parseInt(
                  Math.round((progressEvent.loaded / progressEvent.total) * 100)
                );
              }.bind(this)
            })
            .then(response => {
              console.log("response :>> ", response.data);
            })
            .catch(error => {
              errors.value.push(error.message);
              console.log("error :>> ", error);
            });
        } else {
          console.log("errors :>> ", errors);
        }
      },
      checkForm = () => {
        if (book.title && book.author && book.genre) {
          return true;
        }
        if (!book.title) {
          errors.value.push("title required.");
        }
        if (!book.author) {
          errors.value.push("author required.");
        }
        if (!book.genre) {
          errors.value.push("genre required.");
        }
        if (errors.value.length) return false;
      };

    return {
      genres,
      errors,
      book,
      onFileChange,
      saveBook,
      uploadPercentage
    };
  }
};
</script>
