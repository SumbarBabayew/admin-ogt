<template>
  <div>
    <div v-if="loading">
      <LoadingVue />
    </div>
    <div v-else>
      <h2 class="text-xl font-bold mb-4">Questions for Event {{ eventName }}</h2>

      <table class="min-w-full border-collapse shadow rounded-xl overflow-hidden">
        <thead>
          <tr class="bg-blue-500 text-white text-left">
            <th class="py-2 px-4">Select</th>
            <th class="py-2 px-4">User</th>
            <th class="py-2 px-4">Speaker</th>
            <th class="py-2 px-4">Date</th>
            <th class="py-2 px-4">Question</th>
            <th class="py-2 px-4 text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="q in questions" :key="q.id" class="border-b hover:bg-gray-50">
            
            <!-- Чекбокс -->
            <td class="py-2 px-4 text-center">
              <input 
                type="checkbox"
                :checked="q.isVisible"
                @change="toggleVisibility(q.id, $event.target.checked)"
                class="accent-blue-500 w-4 h-4"
              />
            </td>

            <!-- От кого -->
            <td class="py-2 px-4">
              <div class="font-semibold">{{ q.fromFullName }}</div>
              <div class="text-sm text-gray-500">{{ q.fromEmail }}</div>
            </td>

            <!-- Кому -->
            <td class="py-2 px-4">{{ q.toSpeakerName }}</td>

            <!-- Дата -->
            <td class="py-2 px-4 text-sm text-gray-600">
              {{ new Date(q.createdAt).toLocaleString() }}
            </td>

            <!-- Контент -->
            <td class="py-2 px-4 text-gray-700 break-words max-w-xs">
              <div class="break-words">{{ q.content }}</div>
            </td>

            <!-- Удалить -->
            <td class="py-2 px-4 text-center">
              <button 
                @click="confirmDelete(q.id)" 
                class="text-red-500 hover:text-red-700 font-bold"
              >
                ✕
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import LoadingVue from "~~/components/base/Loading.vue";
import { getQuestionsByEvent, updateQuestionVisibility, deleteQuestion } from "@/service/admin.api.js";

const route = useRoute();
const eventId = route.params.id;
const loading = ref(false);
const questions = ref([]);
const eventName = ref("");

const fetchQuestions = async () => {
  loading.value = true;
  try {
    const response = await getQuestionsByEvent(eventId);
    questions.value = response.data.data || [];
    if (questions.value.length > 0) {
      eventName.value = questions.value[0].eventName;
    }
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const toggleVisibility = async (id, value) => {
  try {
    await updateQuestionVisibility(id, value);
    // Обновляем только изменённый вопрос локально
    const q = questions.value.find(q => q.id === id);
    if (q) q.isVisible = value;
  } catch (err) {
    console.error(err);
    alert("Failed to update visibility");
  }
};

const confirmDelete = async (id) => {
  const ok = window.confirm("Are you sure you want to delete this question?");
  if (!ok) return;

  try {
    loading.value = true;
    console.log("Deleting question ID:", id);
    await deleteQuestion(id);
    // Убираем вопрос из списка
    questions.value = questions.value.filter(q => q.id !== id);
  } catch (err) {
    console.error(err);
    alert("Failed to delete question");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchQuestions);
</script>
