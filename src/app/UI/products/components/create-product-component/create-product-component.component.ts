import { Component, OnInit } from '@angular/core';
import { CreateProductUseCase } from '../../../../products/application/create-product-use-case';
import { Product } from '../../../../products/domain/models/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogClose } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog'


@Component({
  selector: 'app-create-product-component',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatDialogActions,MatDialogContent], 
  templateUrl: './create-product-component.component.html',
  styleUrl: './create-product-component.component.scss'
})
export class CreateProductComponentComponent implements OnInit {
  newProduct: Product = new Product(0, '', 0);

  constructor(
    private createProductUseCase: CreateProductUseCase,
    private dialogRef: MatDialogRef<CreateProductComponentComponent>
  ) {}

  ngOnInit(): void {
    this.newProduct = new Product(0, '', 0); // Asegurar inicialización
  }

  createProduct(): void {

    console.log("Intentando crear producto:", this.newProduct); // Verificar que los datos son correctos

    if (!this.newProduct.Name || this.newProduct.Price <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos inválidos',
        text: 'Por favor, ingrese un nombre y un precio válido',
      });
      return;
    }

    this.createProductUseCase.execute(this.newProduct).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Producto Creado!',
          text: `El producto "${this.newProduct.Name}" ha sido agregado con éxito.`,
          timer: 2000,
          showConfirmButton: false
        });

        this.newProduct = new Product(0, '', 0); // Reiniciar el formulario
        this.dialogRef.close(true); // Cierra el modal y envía una respuesta
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al crear el producto. Inténtalo de nuevo.',
        });
        console.error('Error al crear producto:', error);
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close(false); // Cierra el modal sin éxito
  }
}
