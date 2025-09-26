<script setup>
import { onMounted, ref, computed } from "vue";
import { baseUrl } from '@/data/dashboard/BaseUrl';
import {deleteGalleryImage } from "@/service/admin.api";

const emit = defineEmits(["photoPath"]);
const props = defineProps({
  photoSrc: {
    type: String,
    default: null,
  },
  deleteImageById: {
    type: String,
    default: '0',
  },
  error: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "100%",
  },
  selectedFile: {
    type: String,
    default: "",
  },
  style: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "store"
  }
});
const iconUrl = ref([]);
const imgPath = ref([])

const categoryAddPhoto = async (el) => {
  if (!props.multiple) {
    imgPath.value = []
    iconUrl.value = []
  }

  const files = el.target.files;
  for (let img of files) {
    let reader = new FileReader();
    reader.onload = (e) => {
      iconUrl.value.push(e.target.result);
    };
    imgPath.value.push(img)
    await reader.readAsDataURL(img);
  }
  emit("photoPath", imgPath.value);
};

const deleteImage = async (v, src) => {
  if(props.type == 'user') return;
  if (props.deleteImageById != '0') {
    if (src[0] != 'd') {
      // if (props.type == 'store') await deleteStoreGallary({ id: props.deleteImageById, data: { img: src } })
      if (props.type == 'gallery') await deleteGalleryImage({ id: props.deleteImageById, data: { img: src } })
    } else {
      if (imgPath.value.length == 1) imgPath.value = []
      else imgPath.value.splice(iconUrl.value.length - v, 1)
    }
  }
  iconUrl.value.splice(v, 1)
  emit("photoPath", imgPath.value);
}
onMounted(async () => {
  console.log('src is ', props.photoSrc);
  if (props.photoSrc.type == 'array') { iconUrl.value = await props.photoSrc.value; }
  if (props.photoSrc.type == 'string') { await iconUrl.value.push(props.photoSrc.value) }
})
</script> 
<template>
  <div :class="props.error ? 'error' : ''" class="container__add" :style="style">
    <div class="container__add__image">
      <div class="label">{{ props.placeholder }}</div>
      <div class="container__add__image--box">
        <div class="container__add__image--box--img">
          <v-row>
            <v-col class="d-flex gap-4 flex-wrap" lg="12" sm="12">
              <div class="list-group-item" v-for="(src, i) in iconUrl" :key="i">
                <img crossorigin="anonymous" class="container__add__image--box--img--img"
                  :src="src[0] != 'd' ? `${baseUrl.url_base}/${src}` : src"
                  :style="`width:${props.width}; height:${props.height}`" />
                <div class="container__add__image--box--img--delete" v-if="iconUrl.length != 0"
                  @click="deleteImage(i, src)">X
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
        <div style="display: flex; justify-content: center;">

          <div class="imgBox">
            <PictureInPictureIcon style="color:white" />
            <div class="container__add__image--box--item">
              <input v-if="props.multiple" @change="categoryAddPhoto" multiple class="input_change" type="file" />
              <input v-else @change="categoryAddPhoto" class="input_change" type="file" />
              <!-- <div class="container__add__image--box--item--label">Suraty yukle</div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>