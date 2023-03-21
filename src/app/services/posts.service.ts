import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import {
  DocumentSnapshot,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { Category } from '../models/category';
import { DocumentData } from '@firebase/firestore-types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private storage: AngularFireStorage,
    private fs: AngularFirestore,
    private toastr: ToastrService,
    private router: Router
  ) {}

  uploadImage(
    selectedImage: any,
    postData: any,
    formStatus: string,
    id: any
  ): void {
    const filePath: string = `postImg/${Date.now()}`;
    console.log(filePath);

    this.storage.upload(filePath, selectedImage).then(() => {
      console.log('Image uploaded successfully');

      this.storage
        .ref(filePath)
        .getDownloadURL()
        .subscribe((URL) => {
          postData.postImgPath = URL;

          if (formStatus == 'Edit') {
            this.updateData(id, postData);
          } else {
            this.saveData(postData);
          }
        });
    });
  }

  saveData(postData: any): void {
    this.fs
      .collection('posts')
      .add(postData)
      .then((docRef) => {
        this.toastr.success('Data inserted successfully');
      });
  }

  loadData(): any {
    return this.fs
      .collection('posts')
      .snapshotChanges()
      .pipe(
        map((actions: any) => {
          return actions.map((a: any) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc as QueryDocumentSnapshot<DocumentData>;
            const idID = id.id;
            return { idID, data };
          });
        })
      );
  }

  loadPostToEdit(id: any): any {
    return this.fs.collection('posts').doc(id).valueChanges();
  }

  updateData(id: any, postData: any): void {
    this.fs
      .doc(`posts/${id}`)
      .update(postData)
      .then(() => {
        this.toastr.success('Data updated successfully');
        this.router.navigate(['/allPosts']);
      });
  }

  deleteImg(postImgPath: string, id:any): void {
    this.storage.storage.refFromURL(postImgPath).delete().then(() => {
      this.deleteData(id);
    })
  }

  deleteData(id: string): void {
    this.fs
      .collection('posts')
      .doc(id)
      .delete()
      .then((docRef) => {
        this.toastr.success('Data deleted successfully');
      });
  }
}
