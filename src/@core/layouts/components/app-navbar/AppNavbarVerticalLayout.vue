<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" size="21" />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">

      <!-- Bookmarks Container -->
      <!-- <bookmarks /> -->
      <div>
        <p class="m-0 p-0" style="font-size:16px;font-weight : 600">{{ $t('Organization') }} : {{ universityName }}</p>
        <!-- <br /> -->
        <p class="m-0 p-0" style="font-size:12px; font-weight: 600">{{ $t('username') }} : {{ username }} </p>
      </div>
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <locale />
      <dark-Toggler class="d-none d-lg-block" />
      <search-bar />
      <!-- <cart-dropdown /> -->
      <!-- <notification-dropdown /> -->
      <user-dropdown />
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink, BNavbarNav
} from 'bootstrap-vue'
import Bookmarks from './components/Bookmarks.vue'
import Locale from './components/Locale.vue'
import SearchBar from './components/SearchBar.vue'
import DarkToggler from './components/DarkToggler.vue'
import CartDropdown from './components/CartDropdown.vue'
import NotificationDropdown from './components/NotificationDropdown.vue'
import UserDropdown from './components/UserDropdown.vue'

export default {
  components: {
    BLink,

    // Navbar Components
    BNavbarNav,
    Bookmarks,
    Locale,
    SearchBar,
    DarkToggler,
    CartDropdown,
    NotificationDropdown,
    UserDropdown,
  },
  computed: {
    universityName() {
      return localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).universityName : ''
    },
    orginn() {
      return localStorage.getItem('user_') ? JSON.parse(localStorage.getItem('user_info')).OrgINN : ''
    },
    username() {
      return localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).username : ''
    }
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => { },
    },
  },
}
</script>
