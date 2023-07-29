<div class="footer">
	<a class="personal" href="https://rburd.xyz" target="_blank">
		©2023 Roosevelt Burden
	</a>

	<div class="social">
		<a href="https://github.com/RBird111" target="_blank">
			<i class="fa-brands fa-github" />
		</a>

		<a
			href="https://www.linkedin.com/in/roosevelt-burden-83982026b/"
			target="_blank"
		>
			<i class="fa-brands fa-linkedin" />
		</a>
	</div>
</div>

<style lang="scss">
	.footer {
		position: absolute;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: $c-overlay;
		font-size: 1.2rem;
		border-top: 1px solid $c-sec;
		padding: 0.3rem 0;

		.personal {
			margin-left: 0.8rem;
			transition: all 0.5s ease-in-out;
            font-weight: 400;

            &:hover {
                color: $c-acc;
            }
		}

		.social {
			font-size: 1.6rem;

			a {
				margin-right: 0.8rem;

				i {
					transition: all 0.5s ease-in-out;

                    &:hover {
                        color: $c-acc;
                    }
				}
			}
		}
	}
</style>
