<template>
  <div class="page-header">
    <v-row>
      <v-col sm="12" class="title">
        <h3>{{ titlePageHeader }}</h3>
        <v-row class="d-flex align-center">
          <v-icon class="fs14 pl-3">fas fa-home</v-icon
          ><span class="fs14 px-3">/</span>
          <v-breadcrumbs :items="breadcrumbps" class="pl-0"> </v-breadcrumbs>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  props: {
    titlePageHeader: String,
    breadcrumbps: Array,
  },
};
</script>

<style scoped>
.title {
  padding-bottom: 5px;
}

.title h3 {
  font-size: 24px;
}

.fs14 {
  font-size: 14px;
}

.pull-right {
  display: flex;
  justify-content: flex-end;
}

.pull-right .btn-add {
  font-size: 22px;
  color: #276678;
  text-decoration: none;
}
</style>