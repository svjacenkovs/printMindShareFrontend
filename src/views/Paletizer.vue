<template>
  <div class="flex h-screen">
    <div class="flex flex-col m-auto mt-8 p-4 min-w-1/4 min-h-1/2 space-y-6 border border-gray-300 shadow-md">
      <h1 class="text-xl text-white p-3 mb-1 text-center bg-primaryColor">Palletizer</h1>

      <!-- PRODUCT INFORMATION -->
      <section>
        <div class=" border-b-2 mb-1">
          <h1>Product Information:</h1>
        </div>
        <div class="flex flex-row space-x-4 items-center py-2">
          <div class="w-20">
            <img src="../../public/whl.png" alt="w-h-l" />
          </div>
          <div class="flex flex-col">
            <label class="text-xs mb-1" for="width">Width (mm):</label>
            <input
              id="width"
              type="number"
              placeholder="-"
              class="border border-gray-200 w-17 h-7 text-center"
              v-model.trim="productWidth"
            />
          </div>
          <div class="flex flex-col">
            <label class="text-xs mb-1" for="length">Length (mm):</label>
            <input
              id="length"
              type="number"
              placeholder="-"
              class="border border-gray-200 w-17 h-7 text-center"
              v-model.trim="productLength"
            />
          </div>
          <div class="flex flex-col">
            <label class="text-xs mb-1" for="height">Height (mm):</label>
            <input
              id="height"
              type="number"
              placeholder="-"
              class="border border-gray-200 w-17 h-7 text-center"
              v-model.trim="productHeight"
            />
          </div>
          <div class="flex flex-col">
            <label class="text-xs mb-1" for="height">Quantity:</label>
            <input
              id="quantity"
              type="number"
              placeholder="-"
              class="border border-gray-200 w-17 h-7 text-center"
              v-model.trim="productQuantity"
            />
          </div>
        </div>
      </section>
      <!-- PACKAGING RULES -->
      <section>
        <div class=" border-b-2 mb-1">
          <h1>Packaging Rules:</h1>
        </div>
        <div class="flex flex-row space-x-4 items-center py-2">
          <div class="w-20">
            <img src="../../public/packagingrules.png" alt="w-h-l" />
          </div>
          <div class="vraperis space-y-4">
            <div class="flex flex-col">
              <label class="text-xs mb-1" for="width">Max packaging height (mm):</label>
              <input
                id="packagingHeight"
                type="number"
                placeholder="-"
                class="border border-gray-200 w-38 h-7 text-center"
                v-model.trim="packagingRules.maxPalletHeight"
              />
            </div>
            <div class="flex flex-col">
              <label class="text-xs mb-1" for="width">Max packaging weight (kg):</label>
              <input
                id="packagingWeight"
                type="number"
                placeholder="-"
                class="border border-gray-200 w-38 h-7 text-center"
                v-model.trim="packagingRules.maxPalletWeight"
              />
            </div>
          </div>
        </div>
      </section>
      <!-- PALLET-->
      <section>
        <div class=" border-b-2 mb-1">
          <h1 :class="{ 'text-red-500': !selectedPallet.isValid }">Pallet:</h1>
        </div>
        <div class="flex flex-row space-x-4 items-center py-2">
          <div class="w-24">
            <img src="../../public/pallet.jpg" alt="w-h-l" />
          </div>
          <select class="border border-gray-200 w-full p-1" name="pallet" v-model="selectedPallet.val">
            <option disabled value="">Please select one</option>
            <option v-for="pallet in pallets" :key="pallet.name">{{ pallet.name }}</option>
          </select>
        </div>
      </section>
      <!-- RESULTS -->
      <section>
        <div class=" border-b-2 mb-1">
          <h1>Results:</h1>
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

        <div class="grid grid-cols-1 gap-2 py-2">
          <div class="flex flex-row border border-gray-200 rounded-md overflow-hidden">
            <div class="w-80 text-right p-1 text-sm text-white bg-primaryColor ">One package height:</div>
            <div class="w-full text-center self-center">{{ onePackageHeight }}</div>
          </div>
          <div class="flex flex-row border border-gray-200 rounded-md overflow-hidden">
            <div class="w-80 text-right p-1 text-sm text-white bg-primaryColor ">Products in one package:</div>
            <div class="w-full text-center self-center">{{ productsInOnePackage }}</div>
          </div>
          <div class="flex flex-row border border-gray-200 rounded-md overflow-hidden">
            <div class="w-80 text-right p-1 text-sm text-white bg-primaryColor ">Total number of packages:</div>
            <div class="w-full text-center self-center">{{ totalNumberOfPackages }}</div>
          </div>
          <div class="flex flex-row border border-gray-200 rounded-md overflow-hidden">
            <div class="w-80 text-right p-1 text-sm text-white bg-primaryColor ">Total number of pallets:</div>
            <div class="w-full text-center self-center">{{ totalNumberOfPallets }}</div>
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
      productWidth: '-',
      productLength: '-',
      productHeight: '-',
      productQuantity: 1500,
      packagingRules: {
        maxPalletHeight: 1000,
        maxPalletWeight: 700,
      },
      formIsValid: true,
      selectedPallet: {
        val: '',
        isValid: true,
      },
      pallets: [
        {
          name: 'EURO',
          width: 800,
          length: 1200,
          height: 140,
        },
        {
          name: 'USA',
          width: 1016,
          length: 1219,
          height: 140,
        },
        {
          name: 'UK',
          width: 1000,
          length: 1200,
          height: 220,
        },
      ],
      packaging: {
        onePackageHeight: '-',
        productsInOnePackage: '-',
        totalNumberOfPallets: '-',
        totalNumberOfPackages: '-',
        rowCombinations: { o: '-', m: '-', s: '-', v: '-', w: '-', d: '-' },
      },
    };
  },
  computed: {
    onRowO() {
      return this.packaging.rowCombinations.o;
    },
    onRowM() {
      return this.packaging.rowCombinations.m;
    },
    onRowS() {
      return this.packaging.rowCombinations.s;
    },
    onRowV() {
      return this.packaging.rowCombinations.v;
    },
    onRowW() {
      return this.packaging.rowCombinations.w;
    },
    onRowD() {
      return this.packaging.rowCombinations.d;
    },
    onePackageHeight() {
      return this.packaging.onePackageHeight;
    },
    productsInOnePackage() {
      return this.packaging.productsInOnePackage;
    },
    totalNumberOfPallets() {
      return this.packaging.totalNumberOfPallets;
    },
    totalNumberOfPackages() {
      return this.packaging.totalNumberOfPackages;
    },
  },
  methods: {
    validateForm() {
      this.formIsValid = true;

      if (this.selectedPallet.val === '') {
        this.selectedPallet.isValid = false;
        this.formIsValid = false;
      } else {
        this.selectedPallet.isValid = true;
      }
    },
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
    // loadPallets() {
    //   this.pallets = this.$store.getters['palletizer/allPallets'];
    //   console.log(this.pallets);
    // },
    async calculate() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }
      const pallet = this.pallets.find(({ name }) => name === this.selectedPallet.val);
      const response = await this.$store.dispatch('palletizer/calculatePackaging', {
        pallet,
        product: {
          width: this.productWidth,
          length: this.productLength,
          height: this.productHeight,
          quantity: this.productQuantity,
        },
        packagingRules: this.packagingRules,
      });
      this.packaging = response;
    },
  },
  async created() {
    await this.$store.dispatch('palletizer/loadPallets');
  },
};
</script>
