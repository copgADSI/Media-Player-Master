//Media player
const previus = document.getElementById('previus')
const next = document.getElementById('next')
const stop_player = document.getElementById('stop')
const repeat = document.getElementById('repeat')
const randmon = document.getElementById('random')
const title = document.getElementById('title')
    //save new media
const new_File = document.getElementById('new_File')
const form_save_media = document.getElementById('form_save_media')
const progress_bar = document.getElementById('progress-bar')
const container_new_media = document.getElementById('container_new_media')
const video = document.getElementById('video')
const screen = document.getElementById('screen')
const progress_Bar = document.getElementById('progress_Bar')
let current_video = document.getElementById('current_time')
let duration_video = document.getElementById('duration_time')
    //Firebase 
const db = firebase.firestore()


//Login 
const container_Login = document.getElementById('container_login')
const email = document.getElementById('email')
const password = document.getElementById('password')
const logout = document.getElementById('logout')
const header = document.getElementById('header')

//Register 
const container_Register = document.getElementById('container_register')
const sign_Up = document.getElementById('sing_Up')
const close_sign = document.getElementById('close')

//List Search 

const search_Box = document.querySelector('#seach_Box')
const results_Box = document.querySelector('#results')
const search_Input_Box = document.getElementById('search')


//Template 
const template_List = document.querySelector('#template_List').content
const fragment_List = document.createDocumentFragment()
const list = document.querySelector('#results')