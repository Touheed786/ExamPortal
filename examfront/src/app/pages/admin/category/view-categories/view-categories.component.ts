import { Component, EventEmitter, Output } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.scss']
})
export class ViewCategoriesComponent {

  constructor(private category: CategoryService) { }
  @Output() cIdEvent = new EventEmitter<number>();
  @Output() updateCategory = new EventEmitter<boolean>();
  categories: any = []
  ngOnInit() {
    this.getCategories();
  }
  public getCategories() {
    this.category.getCategories().subscribe((data: any) => {
      this.categories = data;
      console.log(this.categories)
    }),
      () => {
        Swal.fire("Error !!", "Error in Loading data", 'error')
      }
  }

  delete(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You you want to Delete Category!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.category.deleteCategory(id).subscribe((data) => {
          Swal.fire("Deleted Successfully", "", "success")
          this.categories = this.categories.filter((category: any) => category.cid != id)
          Swal.fire(
            'Deleted!',
            'Your Category has been deleted.',
            'success'
          )
        }, (error) => {
          console.log(error)
          Swal.fire("Error", "Error in Deleting the Category", "error")
        })
      }
    })
  }


  update(cId: any) {
    this.cIdEvent.emit(cId);
    this.updateCategory.emit(true);
  }
}
