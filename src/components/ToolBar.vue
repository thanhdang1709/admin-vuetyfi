<template>
    <div>
        <v-card
        color="grey lighten-4"
        flat
        height="auto"
        tile
        >
        <v-toolbar dense dark class="primary" >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <v-toolbar-title text-aglign="center">Employee Management</v-toolbar-title>
            <v-spacer></v-spacer>
            
            <v-menu
            transition="slide-x-transition"
            bottom
            right
            >
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>
            <v-list>
                <v-list-item
                v-for="(item, i) in itemMenus"
                :key="i"
                link
                :to="item.link"
                @click="Logout"
                >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
            </v-menu>
        </v-toolbar>
        </v-card>

        <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        
        >
        <v-list
            dense
            nav
            class="py-0"
        >
            <v-list-item two-line >
            <v-list-item-avatar>
                <img src="https://randomuser.me/api/portraits/men/81.jpg">
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title>Nguyễn Văn A</v-list-item-title>
                <v-list-item-subtitle>admin</v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.link"
            >
            <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {

    data: () => {
    return {
      drawer: false,
      items: [
        { title: 'Home', icon: 'dashboard', link: '/' },
        { title: 'Employee', icon: 'question_answer', link: '/employee'},
        { title: 'Department', icon: 'question_answer', link: '/department'},
      ],
      itemMenus:[
        { title: 'Logout' },
       
      ]
    }
  },
  methods: {
    ...mapActions({
      logout: 'account/logout'
    }),
    Logout () {
      this.logout();
    }
  }
}
</script>