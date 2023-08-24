<template>
    <b-card no-body>
        <div class="m-2">
            <b-row>
                <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
                    <label>{{ $t("Entries") }}</label>
                    <v-select v-model="filter.size" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :options="filter.perPageOptions" :clearable="false" @input="Refresh"
                        class="per-page-selector d-inline-block ml-50 mr-1" />
                    <b-button variant="primary" :to="{ name: 'EditContractschedule', params: { id: 0 } }">
                        <feather-icon icon="PlusIcon"></feather-icon> {{ $t("create") }}
                    </b-button>
                </b-col>
                <b-col md="2"></b-col>
                <b-col cols="12" md="4">
                    <b-input-group class="text-right">
                        <b-form-input v-model="filter.Search" :placeholder="$t('search')" />
                        <b-input-group-append>
                            <b-button @click="Refresh" variant="primary">
                                <feather-icon icon="SearchIcon" />
                            </b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
            </b-row>
        </div>

        <b-table ref="refInvoiceListTable" :items="items" responsive :fields="fields" primary-key="id" sticky-header="65vh"
            no-border-collapse :busy="isBusy" show-empty :empty-text="$t('NotFound')" class="position-relative"
            @sort-changed="SortChange">
            <template #cell(status)="{ item }">
                <b-badge :variant="item.status == 'Пассив' ? 'light-danger' : 'light-success'">
                    {{ item.status }}
                </b-badge>
            </template>
            <template #cell(actions)="{ item }">
                <div class="text-center">
                    <b-link :to="{ name: 'EditContractschedule', params: { id: item.id } }"
                        v-b-tooltip.hover.top="$t('Edit')">
                        <feather-icon icon="EditIcon" style="margin-right : 5px"></feather-icon>
                    </b-link>
                    <b-link :to="{ name: 'Contractscheduleclone', params: { id: item.id } }"
                        v-b-tooltip.hover.top="$t('Clone')">
                        <feather-icon icon="FileIcon" style="margin-right : 5px"></feather-icon>
                    </b-link>
                    <b-link @click="$refs['StatusModal' + item.id].show()" v-b-tooltip.hover.top="$t('status')">
                        <feather-icon icon="ClipboardIcon" style="margin-right : 5px"></feather-icon>
                    </b-link>
                    <b-link v-b-tooltip.hover.top="$t('Delete')">
                        <feather-icon @click="Delete(item)" icon="TrashIcon" style="margin-right : 5px"></feather-icon>
                    </b-link>
                </div>
                <b-modal :ref="'StatusModal' + item.id" :title="$t('Status')" :cancel-title="$t('Cancel')"
                    :ok-title="$t('Accept')" cancel-variant="danger" ok-variant="success" @ok="Status(item)">
                    <b-card-text>
                        <h5>ID : {{ item.id }}</h5>
                        <h5> {{ item.status == false ? $t("WantNoStatus") : $t("WantYesStatus") }}</h5>
                    </b-card-text>
                </b-modal>
            </template>
            <template v-slot:table-busy>
                <div class="text-center text-primary my-2" style="vertical-align: middle">
                    <b-spinner class="align-middle mr-2"></b-spinner>
                    <strong>{{ $t("Loading") }}</strong>
                </div>
            </template>
        </b-table>
        <div class="mx-2 mb-2">
            <b-row>
                <b-col cols="12" sm="6" class="
              d-flex
              align-items-center
              justify-content-center justify-content-sm-start
            ">
                    <span class="text-muted">{{ $t("Showing") }} {{ firstNumber }} {{ $t("to") }}
                        {{ lastNumber }} {{ $t("of") }} {{ filter.totalElements }}
                        {{ $t("entries") }}</span>
                </b-col>
                <!-- Pagination -->
                <b-col cols="12" sm="6" class="
              d-flex
              align-items-center
              justify-content-center justify-content-sm-end
            ">
                    <b-pagination v-model="filter.page" :total-rows="filter.totalElements" :per-page="filter.size"
                        first-number last-number @input="Refresh" class="mb-0 mt-1 mt-sm-0" prev-class="prev-item"
                        next-class="next-item">
                        <template #prev-text>
                            <feather-icon icon="ChevronLeftIcon" size="18" />
                        </template>
                        <template #next-text>
                            <feather-icon icon="ChevronRightIcon" size="18" />
                        </template>
                    </b-pagination>
                </b-col>
            </b-row>
        </div>
    </b-card>
</template>
  
<script>
import {
    BButton,
    BPagination,
    BTable,
    BCol,
    BRow,
    BSpinner,
    BCard,
    BTooltip,
    BBadge,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BLink,
    VBTooltip,
    BModal
} from "bootstrap-vue";
import ContractscheduleService from "@/services/info/contractschedule.service";
export default {
    directives: {
        'b-tooltip': VBTooltip
    },
    components: {
        BButton,
        BPagination,
        BTable,
        BCol,
        BRow,
        BSpinner,
        BCard,
        BTooltip,
        BBadge,
        BInputGroup,
        BFormInput,
        BInputGroupAppend,
        BLink,
        BModal
    },
    data() {
        return {
            items: [],
            fields: [
                {
                    key: "academicYearName",
                    label: this.$t("academicYearName"),
                    sortable: true,
                },
                {
                    key: "basis",
                    label: this.$t("basis"),
                    sortable: true,
                },
                {
                    key: "documentDate",
                    label: this.$t("documentDate"),
                    sortable: true,
                },
                {
                    key: "documentNumber",
                    label: this.$t("documentNumber"),
                    sortable: true,
                },
                {
                    key: "actions",
                    label: this.$t("actions"),
                    thClass: "text-center",
                    tdClass: "text-center",
                },
            ],
            filter: {
                page: 1,
                size: 20,
                perPageOptions: [10, 20, 50, 100],
            },
            isBusy: false,
            StatusLoading: false,
        };
    },
    computed: {
        firstNumber() {
            return (this.filter.page - 1) * this.filter.size + 1;
        },
        lastNumber() {
            if (this.filter.totalElements < this.filter.size) {
                return this.filter.totalElements;
            } else {
                if (
                    this.filter.page * this.filter.size >
                    this.filter.totalElements
                ) {
                    return this.filter.totalElements;
                } else {
                    return this.filter.page * this.filter.size;
                }
            }
        },
    },
    created() {
        this.Refresh();
    },
    methods: {
        Edit(item) {
            this.$router.push({ path: "/info/universities/edit/" + item.id });
        },
        CreateClone(item) {
            this.$router.push({
                path: "@/views/contractinformation/contractschedule/clone.vue" + item.id
            })
        },
        SortChange(data) {
            this.filter.Sort = data.sortBy;
            this.filter.Order = data.sortDesc ? "desc" : "asc";
            this.Refresh();
        },
        Status(item) {
            console.log(item)
            this.StatusLoading = true;
            ContractscheduleService.changeContractDetailStatus(item.id, item.status)
                .then((res) => {
                    this.StatusLoading = false;
                    this.Refresh();
                    this.$makeToast(this.$t("DeleteSuccess"), "success");
                })
                .catch((error) => {
                    this.$makeToast(error.response.data.error, "danger");
                    this.StatusLoading = false;
                });
        },
        Refresh() {
            this.isBusy = true;
            ContractscheduleService.getContractDetails(
                this.filter.page,
                this.filter.size,
            ).then((res) => {
                this.items = res.data.content;
                this.filter.totalElements = res.data.totalElements;
                this.isBusy = false;
            });
        },
    },
};
</script>
  
<style lang="scss" scoped>
.per-page-selector {
    width: 90px;
}

.invoice-filter-select {
    min-width: 190px;

    ::v-deep .vs__selected-options {
        flex-wrap: nowrap;
    }

    ::v-deep .vs__selected {
        width: 100px;
    }
}
</style>
  
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
  