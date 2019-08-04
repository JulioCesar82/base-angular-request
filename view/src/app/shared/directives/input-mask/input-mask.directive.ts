import { Directive, HostListener, Input, ElementRef } from '@angular/core';

// Imports
import {
  NG_VALUE_ACCESSOR, ControlValueAccessor
} from '@angular/forms';
import { isNumber } from 'util';

@Directive({
  selector: '[appInputMask]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputMaskDirective,
    multi: true
  }]
})
export class InputMaskDirective implements ControlValueAccessor {

  onTouched: any;
  onChange: any;

  // mascara definida no formulário
  @Input('appInputMask') appInputMask: string;

  constructor(private el: ElementRef) {
  }

  writeValue(value: any): void {
    if (value) {
      this.el.nativeElement.value = this.aplicarMascara(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    /*if ( !this.el.nativeElement.disabled ) {
      this.el.nativeElement.disabled = true;
    } else {
      this.el.nativeElement.disabled = false;
    }*/
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('keyup', ['$event'])
  onKeyup($event: any) {
    const valor = $event.target.value.replace(/\D/g, '');

    // retorna caso pressionado backspace
    if ($event.keyCode === 8) {
      this.onChange(valor);
      return;
    }

    const pad = this.appInputMask.replace(/\D/g, '').replace(/9/g, '_');
    if (valor.length <= pad.length) {
      this.onChange(valor);
    }

    $event.target.value = this.aplicarMascara(valor);
  }

  @HostListener('blur', ['$event'])
  onBlur($event: any) {
    if ($event.target.value.length === this.appInputMask.length) {
      return;
    }
    this.onChange('');
    // $event.target.value = '';
  }

  /**
   * Aplica a máscara a determinado valor.
   *
   * @param string valor
   * @return string
   */
  aplicarMascara(valor: string): string {
    if (valor.length !== this.appInputMask.length) {
      const sequenciaInput = valor.toString().split('');
      const sequenciaMascara = this.appInputMask.split('');

      const novoNumero = sequenciaMascara.map( (value, index) => {
        if ( !isNaN( parseInt(value, 0) ) ) {
          return sequenciaInput.shift();
        } else {
          return value;
        }
      });

      valor = novoNumero.join('');
    }

    valor = valor.replace(/\D/g, '');
    const pad = this.appInputMask.replace(/\D/g, '').replace(/9/g, '_');
    const valorMask = valor + pad.substring(0, pad.length - valor.length);
    let valorMaskPos = 0;

    valor = '';
    for (let i = 0; i < this.appInputMask.length; i++) {
      if (isNaN( parseInt( this.appInputMask.charAt(i), 0 ) )) {
        valor += this.appInputMask.charAt(i);
      } else {
        valor += valorMask[valorMaskPos++];
      }
    }

    if (valor.indexOf('_') > -1) {
      valor = valor.substr(0, valor.indexOf('_'));
    }

    return valor;
  }
}
