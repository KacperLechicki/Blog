import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private storage: AngularFireStorage, private fs: AngularFirestore, private toastr: ToastrService) {}

  uploadImage(selectedImage: any, postData: any) {
    const filePath: string = `postImg/${Date.now()}`;
    console.log(filePath);

    this.storage.upload(filePath, selectedImage).then(() => {
      console.log('Image uploaded successfully');

      this.storage.ref(filePath).getDownloadURL().subscribe(URL => {
        postData.postImgPath = URL;

        this.fs.collection('posts').add(postData).then(docRef => {
          this.toastr.success('Data inserted successfully')
        })
      })
    });
  }
}
