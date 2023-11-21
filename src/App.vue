<script setup>
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import { computed, ref } from "vue";

const searchQuery = ref("");
const value = gql`
  query countries {
    countries {
      code
      name
      capital
      currency
      emoji
      phone
      emojiU
      states {
        name
      }
      languages {
        name
      }
    }
  }
`;
const { result, loading, error } = useQuery(value);
const filteredCountries = computed(() => {
  if (!result.value) return [];

  const query = searchQuery.value.toLowerCase();
  return result.value.countries.filter((country) =>
    country.name.toLowerCase().includes(query)
  );
});
</script>

<template>
  <div>
    <div class="container mx-auto text-3xl py-10">
      <div class="flex justify-center py-8">
        <h1>This is graphQl apollo client country data fetching</h1>
      </div>

      <div class="flex justify-center">
        <div>
          <div v-if="error">something went wrong...</div>
          <div v-if="loading">loding....</div>
        </div>
      </div>
      <form class="flex justify-center my-7">
        <input
          v-model="searchQuery"
          type="search"
          name=""
          id=""
          placeholder="search countries"
          class="h-12 w-[400px] rounded-l-full rounded-r-full px-4 capitalize text-xl"
        />
      </form>

      <!--countries -->
      <div class="flex justify-center">
        <div
          class="p-10 rounded-md overflow-hidden shadow-lg bg-[#1b3942] overflow-y-scroll"
        >
          <div class="grid grid-cols-2">
            <div v-for="country in filteredCountries" :key="country.name">
              <div
                class="w-[550px] mx-6 h-[300px] bg-gradient-to-r from-[#7d9bc7] via-[#55c0ed] to-[#8a39ed] my-10 relative p-5 shadow-md overflow-hidden overflow-y-auto"
              >
                <div class="p-4 overflow-hidden">
                  <div>
                    <span class="capitalize font-bold">name:</span>
                    {{ country.name }}
                  </div>
                  <div>
                    <span class="capitalize font bold">code:</span>
                    {{ country.code }}
                  </div>
                  <div>
                    <span class="capitalize font bold">capital:</span>
                    {{ country.capital }}
                  </div>
                  <div>
                    <span class="capitalize font bold">emoji:</span>
                    {{ country.emoji }}
                  </div>
                  <div>
                    <div class="flex flex-col">
                      <span class="capitalize font bold"
                        >state:
                        <span v-for="inner in country.states" :key="inner.name">
                          {{ inner.name }}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div>
                    <span
                      v-for="inner in country.languages"
                      :key="inner.language"
                    >
                      <span class="capitalize font bold"
                        >languages:
                        {{ inner.name }}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
