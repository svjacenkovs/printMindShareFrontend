<template>
  <div class="flex h-screen">
    <div class="flex flex-col m-auto mt-16 p-4 min-w-1/4 min-h-1/2 space-y-6 border border-gray-300 shadow-md">
      <h1 class="text-xl text-white p-3 mb-1 text-center bg-primaryColor">Palletizer</h1>
      <section>
        <div class=" border-b-2 mb-1">
          <h1>Product information:</h1>
        </div>
        <div class="flex flex-row space-x-4 items-center py-2">
          <div class="w-20">
            <img src="../../public/whl.png" alt="w-h-l" />
          </div>
          <div class="flex flex-col">
            <label class="text-xs" for="width">Width:</label>
            <input
              id="width"
              type="nummber"
              placeholder="W"
              class="border border-gray-200 w-16 h-7 text-center"
              v-model.trim="productWidth"
            />
          </div>
          <div class="flex flex-col">
            <label class="text-xs" for="length">Length:</label>
            <input
              id="length"
              type="nummber"
              placeholder="L"
              class="border border-gray-200 w-16 h-7 text-center"
              v-model.trim="productLength"
            />
          </div>
          <!-- <div class="flex flex-col">
            <label class="text-xs" for="height">Height:</label>
            <input
              id="height"
              type="nummber"
              class="border border-gray-200 w-16 h-7 text-center"
              v-model.trim="productHeight"
            />
          </div> -->
        </div>
      </section>

      <section>
        <div class=" border-b-2 mb-1">
          <h1>Pallet:</h1>
        </div>
        <div class="flex flex-row space-x-4 items-center py-2">
          <div class="w-24">
            <img src="../../public/pallet.jpg" alt="w-h-l" />
          </div>
          <select class="border border-gray-200 w-full p-1" name="pallet" v-model="selectedPallet">
            <option disabled value="">Please select one</option>
            <option v-for="pallet in pallets" :key="pallet.name">{{ pallet.name }}</option>
          </select>
        </div>
      </section>

      <section>
        <div class=" border-b-2 mb-1">
          <h1>Results <span class="text-xs">(products on pallet row)</span>:</h1>
        </div>
        <div class="grid grid-cols-3 gap-2 py-2">
          <div class="flex flex-row border border-gray-200 rounded-md overflow-hidden">
            <div class="w-1/3 text-center text-white bg-primaryColor ">O</div>
            <div class="w-full text-center">{{ onRowO }}</div>
          </div>
          <div class="flex flex-row border border-gray-200 rounded-md overflow-hidden">
            <div class="w-1/3 text-center text-white bg-primaryColor ">M</div>
            <div class="w-full text-center">{{ onRowM }}</div>
          </div>
          <div class="flex flex-row border border-gray-200 rounded-md overflow-hidden">
            <div class="w-1/3 text-center text-white bg-primaryColor ">S</div>
            <div class="w-full text-center">{{ onRowS }}</div>
          </div>
          <div class="flex flex-row border border-gray-200 rounded-md overflow-hidden">
            <div class="w-1/3 text-center text-white bg-primaryColor ">V</div>
            <div class="w-full text-center">{{ onRowV }}</div>
          </div>
          <div class="flex flex-row border border-gray-200 rounded-md overflow-hidden">
            <div class="w-1/3 text-center text-white bg-primaryColor ">W</div>
            <div class="w-full text-center">{{ onRowW }}</div>
          </div>
          <div class="flex flex-row border border-gray-200 rounded-md overflow-hidden">
            <div class="w-1/3 text-center text-white bg-primaryColor ">D</div>
            <div class="w-full text-center">{{ onRowD }}</div>
          </div>
        </div>
      </section>

      <button @click="calculate()" class="border p-2 bg-primaryColor text-white hover:bg-secondaryColor">
        Calculate
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productWidth: '',
      productLength: '',
      productHeight: '',
      selectedPallet: '',
      pallets: [
        {
          name: 'Euro',
          width: 800,
          length: 1200,
          height: 140,
          packagingHeight: 1000,
          packagingWeight: 750,
        },
        {
          name: 'USA',
          width: 900,
          length: 1000,
          height: 140,
          packagingHeight: 1000,
          packagingWeight: 750,
        },
        {
          name: 'Hatchette',
          width: 1020,
          length: 1300,
          height: 140,
          packagingHeight: 1000,
          packagingWeight: 750,
        },
      ],
      onRow: { o: 0, m: 0, d: 0, s: 0, v: 0, w: 0 },
    };
  },
  computed: {
    onRowO() {
      return this.onRow.o;
    },
    onRowM() {
      return this.onRow.m;
    },
    onRowS() {
      return this.onRow.s;
    },
    onRowV() {
      return this.onRow.v;
    },
    onRowW() {
      return this.onRow.w;
    },
    onRowD() {
      return this.onRow.d;
    },
  },
  methods: {
    createPallet() {
      this.$store.dispatch('palletizer/createPallet', {
        name: 'Aldo Palet',
        width: 900,
        length: 1300,
        height: 150,
        packagingHeight: 1020,
        packagingWeight: 600,
      });
    },
    loadPallets() {
      this.pallets = this.$store.getters['palletizer/allPallets'];
      console.log(this.pallets);
    },
    async calculate() {
      const pallet = this.pallets.find(({ name }) => name === this.selectedPallet);
      const onRow = await this.$store.dispatch('palletizer/calculateRows', {
        pallet,
        product: {
          width: this.productWidth,
          length: this.productLength,
        },
      });
      this.onRow = onRow;
    },
  },
  async created() {
    this.$store.dispatch('palletizer/loadPallets');
  },
};
</script>
