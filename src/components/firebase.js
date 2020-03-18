import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBuFpKaaY65HmjFAJRhpGv99F4g1H-gdzk",
    authDomain: "table-runners-rs.firebaseapp.com",
    databaseURL: "https://table-runners-rs.firebaseio.com",
    projectId: "table-runners-rs",
    storageBucket: "table-runners-rs.appspot.com",
    messagingSenderId: "440276552707",
    appId: "1:440276552707:web:128baadcc68f10b14b9236",
    measurementId: "G-D40PQ2N5Y0"
  };

  function createData(name, score, abc) {
      return { name, score, abc }
  }

  class Firebase {
      constructor() {
        app.initializeApp(firebaseConfig)
        this.auth = app.auth()
        this.db = app.firestore()
        this.storage = app.storage()
      }

      login(email, password) {
        var log
        try  {
          log = this.auth.signInWithEmailAndPassword(email, password)
        }
        catch (e) {
          return e
        }
        this.in = true
        return log
      }

      logout() {
          this.in = false
          return this.auth.signOut()
      }

      async register(name, email, password, abc) {
          await this.auth.createUserWithEmailAndPassword(email, password).then(cred => {
            return this.db.collection('members').doc(cred.user.uid).set({
                name: name,
                abc123: abc,
                score: 1400,
                first: true,
                admin: false
            })
          }).then(() => {
            this.auth.currentUser.updateProfile({
              displayName: name,
              photoURL: 'https://www.clinton.edu/_resources/images/profile-icon.jpg'
            })
          })
      }

      isInitialized() {
          return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
          })
      }

      isLoggedIn() {
        if (this.auth.currentUser === null) {
          return false
        }
        return true
      }

      async getCurrentUsername() {
          return this.auth.currentUser && this.auth.currentUser.displayName
      }

      async getCurrentPhoto() {
        return this.auth.currentUser && this.auth.currentUser.photoURL
      }

      async getFirstTime() {
        const member = await this.db.doc(`members/${this.auth.currentUser.uid}`).get()
        return member.get('first')
      }

      async getCurrentUserAbc() {
        const member = await this.db.doc(`members/${this.auth.currentUser.uid}`).get()
        return member.get('abc123')
      }

      async getCurrentUserScore() {
          if (this.auth.currentUser == null) {
            return false
          }
          const member = await this.db.doc(`members/${this.auth.currentUser.uid}`).get()
          return member.get('score')
      }

      async updateCurrUserProfile(newFile) {
          const upload = this.storage.ref(`images/${newFile.name}`).put(newFile)
          upload.on(
            "state_changed",
            snapshot => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              )
            },
            error => {
              console.log(error)
            },
            () => {
              this.storage.ref("images").child(newFile.name).getDownloadURL().then(url => {
                return this.auth.currentUser.updateProfile({
                  photoURL: url
                })
              })
            }
          )
      }

      async isUserAdmin() {
        if (this.auth.currentUser == null) {
          return false
        }
        const member = await this.db.doc(`members/${this.auth.currentUser.uid}`).get()
        return member.get('admin')
      }

      async firstTime() {
        this.db.collection('members').doc(this.auth.currentUser.uid).update({
          first: false
        })
      }

      async getRowRankingData() {
        var data = []
        var itr = 0
        const snapshot = await this.db.collection('members').get()
        snapshot.docs.forEach(doc => {
            const docData = doc.data();
            data[itr++] = createData(docData.name, docData.score, docData.abc123)
        })
        return data
      }

 } 

 export default new Firebase()