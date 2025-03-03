import Input from "../../../shared/components/Input";

function FormHeader({ formik }: any) {
	return (
		<div className='form_header_container active'>
			<div className='form_header_container_input'>
				<Input
					formik={formik}
					variant='primary'
					size='xl'
					name='title'
					label=''
					type='text'
					required={false}
				/>
			</div>
			<div className='form_header_container_input'>
				<Input
					formik={formik}
					variant='secondary'
					size='sm'
					name='description'
					label=''
					type='text'
					required={false}
					placeholder='Form description'
				/>
				<div className='underline'></div>
			</div>
		</div>
	);
}

export default FormHeader;
